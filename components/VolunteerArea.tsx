import React from 'react';
import type { Category, Resource } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import VolunteerModules from './volunteer/VolunteerModules';

interface VolunteerAreaProps {
  volunteerName: string;
  categories: Category[];
  resources: Resource[];
  onResourceAdded: (resource: Resource) => void;
  onResourceUpdated: (resource: Resource) => void;
  onLogout: () => Promise<void>;
}

const VolunteerArea: React.FC<VolunteerAreaProps> = ({
  volunteerName,
  categories,
  resources,
  onResourceAdded,
  onResourceUpdated,
  onLogout,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-text-main">{t('volunteerArea')}</h2>
      <p className="mt-2 text-text-light">
        {t('volunteerWelcome')}: <span className="font-semibold text-text-main">{volunteerName}</span>
      </p>
      <p className="mt-3 text-sm text-text-light">{t('volunteerAreaIntro')}</p>

      <div className="mt-6">
        <VolunteerModules
          categories={categories}
          resources={resources}
          onResourceAdded={onResourceAdded}
          onResourceUpdated={onResourceUpdated}
        />
      </div>

      <div className="mt-6">
        <button
          onClick={onLogout}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-text-main transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          {t('volunteerLogout')}
        </button>
      </div>
    </div>
  );
};

export default VolunteerArea;
