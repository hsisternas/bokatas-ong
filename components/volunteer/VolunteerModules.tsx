import React, { useEffect, useRef, useState } from 'react';
import type { Category, Resource } from '../../types';
import { useTranslation } from '../../contexts/LanguageContext';
import AddResourceModule from './AddResourceModule';
import EditResourceModule from './EditResourceModule';
import SuppliesModule from './supplies/SuppliesModule';
import ReviewResourcesModule from './ReviewResourcesModule';

interface VolunteerModulesProps {
  routeId: string;
  userEmail: string;
  categories: Category[];
  resources: Resource[];
  onResourceAdded: (resource: Resource) => void;
  onResourceUpdated: (resource: Resource) => void;
  reviewCount: number;
  onReviewCountChange: (count: number) => void;
  openReviewSignal: number;
}

type VolunteerModuleId = 'supplies' | 'review-resources' | 'add-resource' | 'edit-resource';

const VolunteerModules: React.FC<VolunteerModulesProps> = ({
  routeId,
  userEmail,
  categories,
  resources,
  onResourceAdded,
  onResourceUpdated,
  reviewCount,
  onReviewCountChange,
  openReviewSignal,
}) => {
  const { t } = useTranslation();
  const [activeModule, setActiveModule] = useState<VolunteerModuleId>('supplies');
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement | null>(null);

  const moduleOptions: { id: VolunteerModuleId; label: string; icon: string }[] = [
    { id: 'supplies', label: t('volunteerModuleSupplies'), icon: 'lunch_dining' },
    { id: 'review-resources', label: 'Recursos por revisar', icon: 'fact_check' },
    { id: 'add-resource', label: t('volunteerModuleAddResource'), icon: 'add_location_alt' },
    { id: 'edit-resource', label: t('volunteerModuleEditResource'), icon: 'edit_location_alt' },
  ];
  const activeOption = moduleOptions.find((option) => option.id === activeModule) || moduleOptions[0];

  useEffect(() => {
    const handlePointerDownOutside = (event: PointerEvent) => {
      if (!selectorRef.current) {
        return;
      }
      if (!selectorRef.current.contains(event.target as Node)) {
        setIsSelectorOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);
    return () => document.removeEventListener('pointerdown', handlePointerDownOutside);
  }, []);

  useEffect(() => { if (openReviewSignal > 0) setActiveModule('review-resources'); }, [openReviewSignal]);
  return (
    <div>
      <div className="relative mb-4" ref={selectorRef}>
        <button
          onClick={() => setIsSelectorOpen((prev) => !prev)}
          type="button"
          className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-secondary px-3 py-2 text-left text-sm text-text-main dark:border-gray-600 dark:bg-gray-800"
        >
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">{activeOption.icon}</span>
            <span>{activeOption.label}</span>
          </span>
          <span className="material-symbols-outlined text-base">{isSelectorOpen ? 'expand_less' : 'expand_more'}</span>
        </button>

        <div
          className={`absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg transition-all dark:border-gray-600 dark:bg-gray-900 ${
            isSelectorOpen ? 'max-h-64 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
          }`}
        >
          {moduleOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setActiveModule(option.id);
                setIsSelectorOpen(false);
              }}
              type="button"
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                option.id === activeModule ? 'bg-primary/10 text-primary' : 'text-text-main hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-base">{option.icon}</span>
              <span>{option.label}</span>{option.id === 'review-resources' && reviewCount > 0 && <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">{reviewCount}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-2 sm:p-4 dark:border-gray-700 dark:bg-gray-900">
        {activeModule === 'supplies' && (
          <SuppliesModule routeId={routeId} userEmail={userEmail} />
        )}

        {activeModule === 'review-resources' && <ReviewResourcesModule onReviewCountChange={onReviewCountChange} />}

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
      </div>
    </div>
  );
};

export default VolunteerModules;
