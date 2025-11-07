import React from 'react';
import type { Resource, Geolocation } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import Map from './Map';

interface ResourceDetailProps {
  resource: Resource;
}

const ResourceDetail: React.FC<ResourceDetailProps> = ({ resource }) => {
  const { locale, t } = useTranslation();

  const hasCoordinates = resource.coordinates && resource.coordinates.lat !== 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {hasCoordinates && (
        <div className="h-64">
           <Map resources={[resource]} height="100%" />
        </div>
      )}
      
      <div className="p-6">
        <h1 className="text-2xl font-bold text-text-main mb-2">{resource.name[locale]}</h1>
        <p className="text-text-light mb-6">{resource.description[locale]}</p>
        
        <div className="space-y-4">
          {resource.address && (
            <div className="flex items-start">
              <span className="material-symbols-outlined text-primary w-6 text-center me-3 mt-1 flex-shrink-0">location_on</span>
              <div>
                <h2 className="font-semibold text-text-main">{t('address')}</h2>
                <p className="text-text-light">{resource.address}</p>
                {hasCoordinates && (
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${resource.coordinates.lat},${resource.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm font-semibold"
                    >
                        {t('getDirections')}
                    </a>
                )}
              </div>
            </div>
          )}

          {resource.phone && (
            <div className="flex items-start">
              <span className="material-symbols-outlined text-primary w-6 text-center me-3 mt-1 flex-shrink-0">call</span>
              <div>
                <h2 className="font-semibold text-text-main">{t('phone')}</h2>
                <a href={`tel:${resource.phone.replace(/\s/g, '')}`} className="text-text-light hover:text-primary hover:underline">{resource.phone}</a>
              </div>
            </div>
          )}

          {resource.email && (
            <div className="flex items-start">
              <span className="material-symbols-outlined text-primary w-6 text-center me-3 mt-1 flex-shrink-0">mail</span>
              <div>
                <h2 className="font-semibold text-text-main">{t('email')}</h2>
                <a href={`mailto:${resource.email}`} className="text-text-light hover:text-primary hover:underline break-all">{resource.email}</a>
              </div>
            </div>
          )}

          {resource.hours && (
            <div className="flex items-start">
              <span className="material-symbols-outlined text-primary w-6 text-center me-3 mt-1 flex-shrink-0">schedule</span>
              <div>
                <h2 className="font-semibold text-text-main">{t('hours')}</h2>
                <p className="text-text-light">{resource.hours}</p>
              </div>
            </div>
          )}

          {resource.updated && (
             <div className="flex items-start text-xs text-gray-400 mt-6">
               <span className="material-symbols-outlined text-gray-400 w-6 text-center me-3 text-base flex-shrink-0">info</span>
               <div>
                 <p>{t('updated')}: {resource.updated}</p>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;