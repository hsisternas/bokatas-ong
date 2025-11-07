
import React, { useState, useEffect } from 'react';
import type { Category, Resource, View } from './types';
import { getCategories, getResources } from './services/resourceService';
import CategoryGrid from './components/CategoryGrid';
import ResourceList from './components/ResourceList';
import ResourceDetail from './components/ResourceDetail';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import useGeolocation from './hooks/useGeolocation';
import { useTranslation } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [view, setView] = useState<View>({ type: 'categories' });
  const [categories, setCategories] = useState<Category[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  
  const { location, error: geoError, requestLocation } = useGeolocation();
  const { t, locale } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  useEffect(() => {
    setCategories(getCategories());
    setResources(getResources());
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const navigateBack = () => {
    if (view.type === 'detail') {
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
    }
  };
  
  const showBackButton = view.type === 'list' || view.type === 'detail';
  const showHomeButton = view.type !== 'categories';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header title={getTitle()} showBackButton={showBackButton} onBack={navigateBack}>
        <LanguageSelector />
      </Header>
      
      <main className="flex-grow container mx-auto p-4">
        {renderContent()}
      </main>

      {showHomeButton && (
        <button
          onClick={navigateToHome}
          className="fixed bottom-6 end-6 bg-[#22A9DF] text-white rounded-full p-4 shadow-lg hover:bg-[#1f98c8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22A9DF] transition-transform transform hover:scale-110 z-20"
          aria-label={t('home')}
        >
          <span className="material-symbols-outlined">home</span>
        </button>
      )}
    </div>
  );
};

export default App;