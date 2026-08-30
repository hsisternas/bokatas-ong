import React, { useEffect, useState } from 'react';
import type { Category, Resource } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import VolunteerModules from './volunteer/VolunteerModules';
import { subscribeToPendingReviewCount } from '../services/canonicalResourceService';

interface VolunteerAreaProps {
  volunteerName: string;
  volunteerEmail: string;
  routeId: string;
  categories: Category[];
  resources: Resource[];
  onResourceAdded: (resource: Resource) => void;
  onResourceUpdated: (resource: Resource) => void;
  onLogout: () => Promise<void>;
}

const VolunteerArea: React.FC<VolunteerAreaProps> = ({
  volunteerName,
  volunteerEmail,
  routeId,
  categories,
  resources,
  onResourceAdded,
  onResourceUpdated,
  onLogout,
}) => {
  const { t } = useTranslation();
  const [reviewCount, setReviewCount] = useState(0);
  const [openReviewSignal, setOpenReviewSignal] = useState(0);
  useEffect(() => subscribeToPendingReviewCount(setReviewCount), []);

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-3 shadow-lg sm:p-6 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-text-main">{t('volunteerArea')}</h2>
      <p className="mt-2 text-text-light">
        {t('volunteerWelcome')}: <span className="font-semibold text-text-main">{volunteerName}</span>
      </p>
      <p className="mt-3 text-sm text-text-light">{t('volunteerAreaIntro')}</p>

      {reviewCount > 0 && <section className="volunteer-review-notice" aria-label={`${reviewCount} recursos pendientes de revisión`}><div><p className="font-semibold text-text-main">Hay {reviewCount} recurso{reviewCount === 1 ? '' : 's'} esperando revisión</p><p className="text-sm text-text-light">Comprueba los recursos enviados por colaboradores.</p></div><button className="button-secondary" onClick={() => setOpenReviewSignal((value) => value + 1)}>Revisar ahora</button></section>}

      <div className="mt-6">
        <VolunteerModules
          routeId={routeId}
          userEmail={volunteerEmail}
          categories={categories}
          resources={resources}
          onResourceAdded={onResourceAdded}
          onResourceUpdated={onResourceUpdated}
          reviewCount={reviewCount}
          onReviewCountChange={setReviewCount}
          openReviewSignal={openReviewSignal}
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
