import React from 'react';
import type { Resource, Geolocation } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import Map from './Map';
import { reportResourceProblem } from '../services/canonicalResourceService';

interface ResourceDetailProps {
  resource: Resource;
}

const ResourceDetail: React.FC<ResourceDetailProps> = ({ resource }) => {
  const { locale, t } = useTranslation();
  const [reportOpen, setReportOpen] = React.useState(false);
  const [reportReason, setReportReason] = React.useState('incorrect');
  const [reportDetails, setReportDetails] = React.useState('');
  const [reportState, setReportState] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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
          <section className="mt-8 border-t border-gray-200 pt-5 dark:border-gray-700">
            <button className="link-button text-sm" type="button" onClick={() => setReportOpen((open) => !open)}>¿Hay algún problema con este recurso?</button>
            {reportOpen && <form className="mt-3 space-y-3 rounded-xl bg-secondary/50 p-3" onSubmit={async (event) => { event.preventDefault(); setReportState('sending'); try { await reportResourceProblem(resource.id, resource.name[locale], reportReason, reportDetails); setReportState('sent'); setReportDetails(''); } catch { setReportState('error'); } }}><label className="form-label">Motivo<select className="form-control" value={reportReason} onChange={(event) => setReportReason(event.target.value)}><option value="incorrect">La información es incorrecta</option><option value="closed">El recurso ha cerrado o no está disponible</option><option value="safety">Puede haber un problema de seguridad</option><option value="other">Otro problema</option></select></label><label className="form-label">Cuéntanos qué ocurre <span className="font-normal">(opcional)</span><textarea className="form-control" rows={3} value={reportDetails} onChange={(event) => setReportDetails(event.target.value)} maxLength={1200} /></label>{reportState === 'sent' && <p className="text-sm text-primary-dark" role="status">Gracias. Bokatas revisará la información.</p>}{reportState === 'error' && <p className="text-sm text-red-700" role="alert">No se pudo enviar el aviso. Inténtalo de nuevo o contacta con Bokatas.</p>}<button className="button-secondary" disabled={reportState === 'sending'}>{reportState === 'sending' ? 'Enviando…' : 'Enviar aviso'}</button></form>}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
