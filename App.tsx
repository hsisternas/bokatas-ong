
import React, { useEffect, useRef, useState } from 'react';
import type { Category, Resource, View } from './types';
import { getCategories, getResources } from './services/resourceService';
import CategoryGrid from './components/CategoryGrid';
import ResourceList from './components/ResourceList';
import ResourceDetail from './components/ResourceDetail';
import VolunteerArea from './components/VolunteerArea';
import VolunteerLoginModal from './components/VolunteerLoginModal';
import ContributorAuthModal from './components/contributor/ContributorAuthModal';
import ContributorArea from './components/contributor/ContributorArea';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import ThemeToggle from './components/ThemeToggle';
import useGeolocation from './hooks/useGeolocation';
import { useTranslation } from './contexts/LanguageContext';
import { isFirebaseAuthConfigured } from './services/firebaseClient';
import { getRouteIdFromEmail, loginVolunteer } from './services/authService';
import { isLegacyCatalogMigrated, getPublishedResourceRecords } from './services/canonicalResourceService';
import { isVolunteerUser, logoutAuthenticatedUser, subscribeAuthUser } from './services/contributorAuthService';
import { toPublicResource } from './domain/resource';
import type { User } from 'firebase/auth';

const App: React.FC = () => {
  const [view, setView] = useState<View>({ type: 'categories' });
  const [categories, setCategories] = useState<Category[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthResolved, setIsAuthResolved] = useState(!isFirebaseAuthConfigured);
  const [isVolunteerAccessPending, setIsVolunteerAccessPending] = useState(false);
  const [isContributorAuthOpen, setIsContributorAuthOpen] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const isVolunteerAccessPendingRef = useRef(false);
  
  const { location, requestLocation } = useGeolocation();
  const { t, locale } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  useEffect(() => {
    const baseCategories = getCategories();
    const baseResources = getResources();
    setCategories(baseCategories);
    setResources(baseResources);

    Promise.all([isLegacyCatalogMigrated(), getPublishedResourceRecords()])
      .then(([migrated, published]) => {
        const canonical = published.map((resource) => toPublicResource(resource, locale));
        setResources(migrated ? canonical : [...baseResources, ...canonical]);
      })
      .catch(() => {
        // Keep base resources available even if Firestore fails.
      });

    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', '#2AA7DF');
    }
  }, [theme]);

  useEffect(() => {
    isVolunteerAccessPendingRef.current = isVolunteerAccessPending;
  }, [isVolunteerAccessPending]);

  useEffect(() => {
    const unsubscribe = subscribeAuthUser((user) => {
      setIsAuthResolved(true);
      setAuthUser(user);
      if (user && isVolunteerUser(user) && isVolunteerAccessPendingRef.current) {
        setView({ type: 'volunteer' });
        setIsVolunteerAccessPending(false);
        return;
      }
      if (!user) {
        setIsVolunteerAccessPending(false);
        setView((currentView) => (currentView.type === 'volunteer' ? { type: 'categories' } : currentView));
      }
    });

    return unsubscribe;
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const navigateToCategory = (category: Category) => {
    setView({ type: 'list', category });
  };

  const navigateToDetail = (resource: Resource) => {
    setView({ type: 'detail', resource });
  };

  const navigateToHome = () => {
    setView({ type: 'categories' });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const navigateBack = () => {
    if (view.type === 'volunteer' || view.type === 'contributor') {
      setView({ type: 'categories' });
    } else if (view.type === 'detail') {
      const resourceCategory = categories.find(c => c.id === view.resource.categoryId);
      if (resourceCategory) {
        setView({ type: 'list', category: resourceCategory });
      } else {
        setView({ type: 'categories' });
      }
    } else if (view.type === 'list') {
      setView({ type: 'categories' });
    }
  };

  const renderContent = () => {
    switch (view.type) {
      case 'categories':
        return <CategoryGrid categories={categories} onSelectCategory={navigateToCategory} onContribute={openContribution} />;
      case 'list':
        return <ResourceList category={view.category} resources={resources} onSelectResource={navigateToDetail} userLocation={location} onContribute={openContribution} />;
      case 'detail':
        return <ResourceDetail resource={view.resource} />;
      case 'volunteer':
        if (!authUser || !isVolunteerUser(authUser)) {
          return (
            <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
              <p className="text-center text-text-light">{t('loading')}</p>
            </div>
          );
        }
        return (
          <VolunteerArea
            volunteerName={authUser.email?.split('@')[0] || 'ruta'}
            volunteerEmail={authUser.email || ''}
            routeId={volunteerRouteId}
            categories={categories}
            resources={resources}
            onResourceAdded={handleResourceAdded}
            onResourceUpdated={handleResourceUpdated}
            onLogout={handleVolunteerLogout}
          />
        );
      case 'contributor':
        return authUser && !isVolunteerUser(authUser)
          ? <ContributorArea user={authUser} categories={categories} />
          : <CategoryGrid categories={categories} onSelectCategory={navigateToCategory} onContribute={openContribution} />;
      default:
        return <CategoryGrid categories={categories} onSelectCategory={navigateToCategory} />;
    }
  };

  const getTitle = () => {
    switch (view.type) {
      case 'categories':
        return t('appName');
      case 'list':
        return view.category.name[locale];
      case 'detail':
        return view.resource.name[locale];
      case 'volunteer':
        return t('volunteerArea');
      case 'contributor':
        return 'Mi colaboración';
    }
  };

  const handleVolunteerLogin = async (username: string, password: string) => {
    setIsAuthLoading(true);
    setIsVolunteerAccessPending(true);
    try {
      await loginVolunteer(username, password);
      setIsLoginOpen(false);
    } catch (error) {
      setIsVolunteerAccessPending(false);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleVolunteerLogout = async () => {
    setIsAuthLoading(true);
    setIsVolunteerAccessPending(false);
    try {
      await logoutAuthenticatedUser();
      setView({ type: 'categories' });
    } finally {
      setIsAuthLoading(false);
    }
  };

  const openVolunteerAccess = () => {
    if (!isAuthResolved || isAuthLoading) {
      return;
    }
    if (authUser && isVolunteerUser(authUser)) {
      setView({ type: 'volunteer' });
      return;
    }
    if (authUser) {
      setView({ type: 'contributor' });
      return;
    }
    setIsLoginOpen(true);
  };

  const openContribution = () => {
    if (authUser && !isVolunteerUser(authUser)) {
      setView({ type: 'contributor' });
      return;
    }
    if (authUser && isVolunteerUser(authUser)) {
      setView({ type: 'volunteer' });
      return;
    }
    setIsContributorAuthOpen(true);
  };

  const handleResourceAdded = (resource: Resource) => {
    setResources((prev) => [resource, ...prev]);
  };

  const handleResourceUpdated = (updated: Resource) => {
    setResources((prev) => prev.map((resource) => (resource.id === updated.id ? updated : resource)));
  };
  
  const showBackButton = view.type === 'list' || view.type === 'detail' || view.type === 'volunteer' || view.type === 'contributor';
  const showHomeButton = view.type !== 'categories';
  const volunteerRouteId = getRouteIdFromEmail(authUser?.email || null);

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col font-sans">
      <Header title={getTitle()} showBackButton={showBackButton} onBack={navigateBack}>
        <div className="flex items-center gap-1">
          <ThemeToggle isDark={theme === 'dark'} onToggle={toggleTheme} />
          <LanguageSelector />
        </div>
      </Header>
      
      <main className="flex-grow container mx-auto px-3 py-4 sm:px-6">
        {renderContent()}
      </main>

      <footer className="safe-bottom mt-auto w-full border-t border-gray-200/70 px-6 py-3 dark:border-gray-700/70">
        <div className="container mx-auto flex justify-center">
          <button
            onClick={openVolunteerAccess}
            disabled={!isAuthResolved || isAuthLoading}
            className="text-xs text-text-light underline-offset-2 hover:text-primary hover:underline"
          >
            {authUser && isVolunteerUser(authUser) ? t('volunteerArea') : t('volunteerAccess')}
          </button>
          {!authUser || !isVolunteerUser(authUser) ? <button onClick={openContribution} className="text-xs text-text-light underline-offset-2 hover:text-primary hover:underline">{authUser ? 'Mi colaboración' : 'Añade un recurso'}</button> : null}
        </div>
      </footer>

      {showHomeButton && (
        <button
          onClick={navigateToHome}
          className="safe-fab fixed end-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-110 z-20"
          aria-label={t('home')}
        >
          <span className="material-symbols-outlined">home</span>
        </button>
      )}

      <VolunteerLoginModal
        isOpen={isLoginOpen}
        isLoading={isAuthLoading}
        authUnavailable={!isFirebaseAuthConfigured}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleVolunteerLogin}
      />
      <ContributorAuthModal open={isContributorAuthOpen} onClose={() => setIsContributorAuthOpen(false)} />
    </div>
  );
};

export default App;
