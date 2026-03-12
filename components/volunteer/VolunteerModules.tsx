import React, { useState } from 'react';
import type { Category, Resource } from '../../types';
import { useTranslation } from '../../contexts/LanguageContext';
import AddResourceModule from './AddResourceModule';
import EditResourceModule from './EditResourceModule';

interface VolunteerModulesProps {
  categories: Category[];
  resources: Resource[];
  onResourceAdded: (resource: Resource) => void;
  onResourceUpdated: (resource: Resource) => void;
}

type VolunteerModuleId = 'add-resource' | 'edit-resource' | 'upcoming';

const VolunteerModules: React.FC<VolunteerModulesProps> = ({
  categories,
  resources,
  onResourceAdded,
  onResourceUpdated,
}) => {
  const { t } = useTranslation();
  const [activeModule, setActiveModule] = useState<VolunteerModuleId>('add-resource');

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveModule('add-resource')}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            activeModule === 'add-resource'
              ? 'bg-primary text-white'
              : 'bg-secondary text-text-main hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {t('volunteerModuleAddResource')}
        </button>
        <button
          onClick={() => setActiveModule('edit-resource')}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            activeModule === 'edit-resource'
              ? 'bg-primary text-white'
              : 'bg-secondary text-text-main hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {t('volunteerModuleEditResource')}
        </button>
        <button
          onClick={() => setActiveModule('upcoming')}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            activeModule === 'upcoming'
              ? 'bg-primary text-white'
              : 'bg-secondary text-text-main hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {t('volunteerModuleUpcoming')}
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        {activeModule === 'add-resource' && (
          <AddResourceModule categories={categories} onResourceAdded={onResourceAdded} />
        )}

        {activeModule === 'edit-resource' && (
          <EditResourceModule
            categories={categories}
            resources={resources}
            onResourceUpdated={onResourceUpdated}
          />
        )}

        {activeModule === 'upcoming' && (
          <p className="text-sm text-text-light">{t('volunteerModuleUpcomingText')}</p>
        )}
      </div>
    </div>
  );
};

export default VolunteerModules;
