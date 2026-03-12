
import React, { useState, useEffect } from 'react';
import type { Category, Resource, View } from './types';
import { getCategories, getResources } from './services/resourceService';
import CategoryGrid from './components/CategoryGrid';
import ResourceList from './components/ResourceList';
import ResourceDetail from './components/ResourceDetail';
import VolunteerArea from './components/VolunteerArea';
import VolunteerLoginModal from './components/VolunteerLoginModal';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import ThemeToggle from './components/ThemeToggle';
import useGeolocation from './hooks/useGeolocation';
import { useTranslation } from './contexts/LanguageContext';
import { isFirebaseAuthConfigured } from './services/firebaseClient';
import { getRouteIdFromEmail, loginVolunteer, logoutVolunteer, subscribeVolunteerSession } from './services/authService';
import { getResourceOverrides, getVolunteerResources } from './services/resourceStoreService';

const App: React.FC = () => {
  const [view, setView] = useState<View>({ type: 'categories' });
  const [categories, setCategories] = useState<Category[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [volunteerEmail, setVolunteerEmail] = useState<string | null>(null);
  
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

    Promise.all([getVolunteerResources(), getResourceOverrides()])
      .then(([volunteerResources, overrides]) => {
        const merged = [...baseResources, ...volunteerResources].map((resource) => overrides[resource.id] || resource);
        setResources(merged);
      })
      .catch(() => {
        // Keep base resources available even if Firestore fails.
      });

    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      themeColorMeta.setAttribute('content', '#2AA7DF');
    }
  }, [theme]);

  useEffect(() => {
    const unsubscribe = subscribeVolunteerSession((email) => {
      setVolunteerEmail(email);
      if (!email) {
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
    if (view.type === 'volunteer') {
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
        return <CategoryGrid categories={categories} onSelectCategory={navigateToCategory} />;
      case 'list':
        return <ResourceList category={view.category} resources={resources} onSelectResource={navigateToDetail} userLocation={location} />;
      case 'detail':
        return <ResourceDetail resource={view.resource} />;
      case 'volunteer':
        return (
          <VolunteerArea
            volunteerName={volunteerEmail?.split('@')[0] || 'ruta'}
            volunteerEmail={volunteerEmail || `${volunteerRouteId}@voluntarios.bokatas.local`}
            routeId={volunteerRouteId}
            categories={categories}
            resources={resources}
            onResourceAdded={handleResourceAdded}
            onResourceUpdated={handleResourceUpdated}
            onLogout={handleVolunteerLogout}
          />
        );
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
    }
  };

  const handleVolunteerLogin = async (username: string, password: string) => {
    setIsAuthLoading(true);
    try {
      await loginVolunteer(username, password);
      setIsLoginOpen(false);
      setView({ type: 'volunteer' });
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleVolunteerLogout = async () => {
    setIsAuthLoading(true);
    try {
      await logoutVolunteer();
      setView({ type: 'categories' });
    } finally {
      setIsAuthLoading(false);
    }
  };

  const openVolunteerAccess = () => {
    if (volunteerEmail) {
      setView({ type: 'volunteer' });
      return;
    }
    setIsLoginOpen(true);
  };

  const handleResourceAdded = (resource: Resource) => {
    setResources((prev) => [resource, ...prev]);
  };

  const handleResourceUpdated = (updated: Resource) => {
    setResources((prev) => prev.map((resource) => (resource.id === updated.id ? updated : resource)));
  };
  
  const showBackButton = view.type === 'list' || view.type === 'detail' || view.type === 'volunteer';
  const showHomeButton = view.type !== 'categories';
  const volunteerRouteId = getRouteIdFromEmail(volunteerEmail) || 'ruta-1';

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
            className="text-xs text-text-light underline-offset-2 hover:text-primary hover:underline"
          >
            {volunteerEmail ? t('volunteerArea') : t('volunteerAccess')}
          </button>
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
    </div>
  );
};

export default App;
