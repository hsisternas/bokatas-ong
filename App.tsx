
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
import VolunteerSignupPage from './components/VolunteerSignupPage';
import MobileNavigationMenu from './components/MobileNavigationMenu';
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

const getInitialView = (): View => window.location.pathname === '/hazte-voluntario'
  ? { type: 'volunteer-signup' }
  : { type: 'categories' };

const App: React.FC = () => {
  const [view, setView] = useState<View>(getInitialView);
  const [categories, setCategories] = useState<Category[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthResolved, setIsAuthResolved] = useState(!isFirebaseAuthConfigured);
  const [isVolunteerAccessPending, setIsVolunteerAccessPending] = useState(false);
  const [isContributorAuthOpen, setIsContributorAuthOpen] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [contributorScreen, setContributorScreen] = useState<'list' | 'create'>('list');
  const [pendingContributorIntent, setPendingContributorIntent] = useState<'list' | 'create' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isVolunteerAccessPendingRef = useRef(false);
  
  const { location, error: locationError, loading: isLocationLoading, requestLocation } = useGeolocation();
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    const handlePopState = () => setView(getInitialView());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#f0f9ff');
    }
    // This value applies to Home-screen web apps; Safari itself controls its
    // chrome and does not guarantee dynamic status-bar icon changes.
    const appleStatusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleStatusBarMeta) {
      appleStatusBarMeta.setAttribute('content', theme === 'dark' ? 'black-translucent' : 'default');
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
      if (user && !isVolunteerUser(user) && pendingContributorIntent) {
        setContributorScreen(pendingContributorIntent);
        setPendingContributorIntent(null);
        setView({ type: 'contributor' });
        return;
      }
      if (!user) {
        setIsVolunteerAccessPending(false);
        setView((currentView) => (currentView.type === 'volunteer' ? { type: 'categories' } : currentView));
      }
    });

    return unsubscribe;
  }, [pendingContributorIntent]);

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
    if (window.location.pathname !== '/') window.history.pushState({}, '', '/');
    setView({ type: 'categories' });
  };

  const navigateToVolunteerSignup = () => {
    if (window.location.pathname !== '/hazte-voluntario') window.history.pushState({}, '', '/hazte-voluntario');
    setView({ type: 'volunteer-signup' });
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
    } else if (view.type === 'volunteer-signup') {
      navigateToHome();
    }
  };

  const renderContent = () => {
    switch (view.type) {
      case 'categories':
        return <CategoryGrid categories={categories} onSelectCategory={navigateToCategory} onContribute={openContribution} />;
      case 'list':
        return <ResourceList category={view.category} resources={resources} onSelectResource={navigateToDetail} userLocation={location} onRequestLocation={requestLocation} locationError={locationError} isLocationLoading={isLocationLoading} onContribute={openContribution} />;
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
          ? <ContributorArea user={authUser} categories={categories} initialScreen={contributorScreen} onLogout={handleContributorLogout} />
          : <CategoryGrid categories={categories} onSelectCategory={navigateToCategory} onContribute={openContribution} />;
      case 'volunteer-signup':
        return <VolunteerSignupPage />;
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
        return 'Mis recursos';
      case 'volunteer-signup':
        return 'Hazte voluntario';
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

  const handleContributorLogout = async () => {
    await logoutAuthenticatedUser();
    setContributorScreen('list');
    setView({ type: 'categories' });
  };

  const openContributorArea = () => {
    if (authUser && !isVolunteerUser(authUser)) {
      setContributorScreen('list');
      setView({ type: 'contributor' });
      return;
    }
    if (!authUser) {
      setPendingContributorIntent('list');
      setIsContributorAuthOpen(true);
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
      setContributorScreen('create');
      setView({ type: 'contributor' });
      return;
    }
    if (authUser && isVolunteerUser(authUser)) {
      setView({ type: 'volunteer' });
      return;
    }
    setPendingContributorIntent('create');
    setIsContributorAuthOpen(true);
  };

  const handleResourceAdded = (resource: Resource) => {
    setResources((prev) => [resource, ...prev]);
  };

  const handleResourceUpdated = (updated: Resource) => {
    setResources((prev) => prev.map((resource) => (resource.id === updated.id ? updated : resource)));
  };
  
  const showBackButton = view.type === 'list' || view.type === 'detail' || view.type === 'volunteer' || view.type === 'contributor' || view.type === 'volunteer-signup';
  const showHomeButton = view.type !== 'categories';
  const volunteerRouteId = getRouteIdFromEmail(authUser?.email || null);

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col font-sans">
      <Header title={getTitle()} showBackButton={showBackButton} onBack={navigateBack}>
        <div className="flex items-center gap-1">
          <LanguageSelector />
          <ThemeToggle isDark={theme === 'dark'} onToggle={toggleTheme} />
          <button className="icon-button" type="button" onClick={() => setIsMobileMenuOpen(true)} aria-label="Abrir menú" aria-expanded={isMobileMenuOpen} aria-haspopup="dialog">
            <span className="material-symbols-outlined" aria-hidden="true">menu</span>
          </button>
        </div>
      </Header>
      
      <main className="flex-grow container mx-auto px-3 py-4 sm:px-6">
        {renderContent()}
      </main>

      <footer className="footer-surface safe-bottom mt-auto w-full px-6 py-3">
        <nav className="container mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs" aria-label="Información de Bokatas">
          <a className="footer-link" href="https://bokatas.org/" target="_blank" rel="noreferrer">Bokatas.org</a>
          <span className="footer-divider" aria-hidden="true">·</span>
          <a className="footer-link" href="https://bokatas.org/politica-de-privacidad/" target="_blank" rel="noreferrer">Privacidad</a>
          <span className="footer-divider" aria-hidden="true">·</span>
          <a className="footer-link" href="mailto:info@bokatas.org">Contacto</a>
        </nav>
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
      <ContributorAuthModal open={isContributorAuthOpen} intent={pendingContributorIntent} onClose={() => setIsContributorAuthOpen(false)} onDismiss={() => { setIsContributorAuthOpen(false); setPendingContributorIntent(null); }} />
      <MobileNavigationMenu
        open={isMobileMenuOpen}
        sessionKind={authUser && isVolunteerUser(authUser) ? 'volunteer' : authUser ? 'contributor' : 'public'}
        onClose={() => setIsMobileMenuOpen(false)}
        onAccount={openContributorArea}
        onAddResource={openContribution}
        onVolunteerAccess={openVolunteerAccess}
        onVolunteerSignup={navigateToVolunteerSignup}
      />
    </div>
  );
};

export default App;
