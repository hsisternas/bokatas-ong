import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Category } from '../../types';
import { emptyResourceInput, type ResourceInput } from '../../domain/resource';
import { loadGoogleMapsScript } from '../../services/googleMapsLoader';

interface ResourceFormProps {
  categories: Category[];
  initialValue?: ResourceInput;
  submitLabel: string;
  onSubmit: (value: ResourceInput) => Promise<void>;
  onCancel?: () => void;
}

const isValenciaMetro = (latitude: number, longitude: number) => latitude >= 39.28 && latitude <= 39.68 && longitude >= -0.62 && longitude <= -0.12;

const ResourceForm: React.FC<ResourceFormProps> = ({ categories, initialValue, submitLabel, onSubmit, onCancel }) => {
  const [value, setValue] = useState<ResourceInput>(initialValue || { ...emptyResourceInput(), categoryId: categories[0]?.id || 'otros' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const addressRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (initialValue) setValue(initialValue); }, [initialValue]);
  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete | null = null;
    loadGoogleMapsScript().then(() => {
      if (!addressRef.current || typeof window.google?.maps?.places?.Autocomplete !== 'function') return;
      autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, { fields: ['formatted_address', 'geometry'], types: ['address'], componentRestrictions: { country: 'es' } });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete?.getPlace();
        const location = place?.geometry?.location;
        if (!location) return;
        const latitude = location.lat(); const longitude = location.lng();
        setValue((current) => ({ ...current, address: place?.formatted_address || current.address, latitude, longitude }));
      });
    }).catch(() => undefined);
    return () => { autocomplete = null; };
  }, []);

  const update = (key: keyof ResourceInput, next: string | number | null) => setValue((current) => ({ ...current, [key]: next }));
  const categoryOptions = useMemo(() => categories.map((category) => <option key={category.id} value={category.id}>{category.name.es}</option>), [categories]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); setError('');
    if (value.latitude === null || value.longitude === null || !isValenciaMetro(value.latitude, value.longitude)) {
      setError('Selecciona una dirección dentro de Valencia y su área metropolitana.'); return;
    }
    setSaving(true);
    try { await onSubmit(value); } catch (reason) { setError(reason instanceof Error ? reason.message : 'No se pudo guardar el recurso.'); } finally { setSaving(false); }
  };
  return <form onSubmit={handleSubmit} className="space-y-4" noValidate>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="form-label">Categoría<select value={value.categoryId} onChange={(event) => update('categoryId', event.target.value)} className="form-control">{categoryOptions}</select></label>
      <label className="form-label">Nombre del recurso<input required value={value.name} onChange={(event) => update('name', event.target.value)} className="form-control" maxLength={180} /></label>
    </div>
    <label className="form-label">¿Cómo ayuda este recurso?<textarea required value={value.description} onChange={(event) => update('description', event.target.value)} className="form-control" rows={4} maxLength={4000} /></label>
    <label className="form-label">Dirección<input ref={addressRef} required value={value.address} onChange={(event) => { update('address', event.target.value); update('latitude', null); update('longitude', null); }} className="form-control" placeholder="Empieza a escribir una dirección de Valencia" maxLength={500} /><span className="mt-1 block text-xs text-text-light">Selecciona una sugerencia para situarlo en el mapa.</span></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="form-label">Teléfono <span className="font-normal">(opcional)</span><input value={value.phone} onChange={(event) => update('phone', event.target.value)} className="form-control" maxLength={120} /></label><label className="form-label">Email <span className="font-normal">(opcional)</span><input type="email" value={value.email} onChange={(event) => update('email', event.target.value)} className="form-control" maxLength={320} /></label></div>
    <div className="grid gap-4 sm:grid-cols-2"><label className="form-label">Web <span className="font-normal">(opcional)</span><input type="url" value={value.website} onChange={(event) => update('website', event.target.value)} className="form-control" placeholder="https://" maxLength={500} /></label><label className="form-label">Horario <span className="font-normal">(opcional)</span><input value={value.scheduleRaw} onChange={(event) => update('scheduleRaw', event.target.value)} className="form-control" placeholder="L a V, de 9:00 a 14:00" maxLength={1000} /></label></div>
    {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
    <div className="flex flex-wrap gap-3"><button className="button-primary" type="submit" disabled={saving}>{saving ? 'Guardando…' : submitLabel}</button>{onCancel && <button className="button-secondary" type="button" onClick={onCancel}>Cancelar</button>}</div>
  </form>;
};

export default ResourceForm;
