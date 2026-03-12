import React, { useEffect, useMemo, useState } from 'react';
import type { Category, Resource } from '../../types';
import { useTranslation } from '../../contexts/LanguageContext';
import { addVolunteerResource } from '../../services/resourceStoreService';
import { loadGoogleMapsScript } from '../../services/googleMapsLoader';

interface AddResourceModuleProps {
  categories: Category[];
  onResourceAdded: (resource: Resource) => void;
}

const AddResourceModule: React.FC<AddResourceModuleProps> = ({ categories, onResourceAdded }) => {
  const { t, locale } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const [isMapsReady, setIsMapsReady] = useState(false);
  const [isAutocompleteAvailable, setIsAutocompleteAvailable] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const addressInputRef = React.useRef<HTMLInputElement | null>(null);
  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null);

  const defaultCategory = categories[0]?.id || 'otros';
  const [form, setForm] = useState({
    categoryId: defaultCategory,
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
  });
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [openTime, setOpenTime] = useState('09:00');
  const [closeTime, setCloseTime] = useState('14:00');

  useEffect(() => {
    if (!form.categoryId && defaultCategory) {
      setForm((prev) => ({ ...prev, categoryId: defaultCategory }));
    }
  }, [defaultCategory, form.categoryId]);

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        const hasLegacyAutocomplete = typeof window.google?.maps?.places?.Autocomplete === 'function';
        setIsAutocompleteAvailable(hasLegacyAutocomplete);
        setIsMapsReady(true);
      })
      .catch(() => setError(t('volunteerMapAutocompleteError')));
  }, [t]);

  useEffect(() => {
    if (!isMapsReady || !isAutocompleteAvailable || !addressInputRef.current || autocompleteRef.current) {
      return;
    }

    try {
      const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        fields: ['formatted_address', 'geometry'],
        types: ['address'],
      });
      autocompleteRef.current = autocomplete;

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const formattedAddress = place?.formatted_address;
        const placeLocation = place?.geometry?.location;

        if (!formattedAddress || !placeLocation) {
          setCoordinates(null);
          return;
        }

        setForm((prev) => ({ ...prev, address: formattedAddress }));
        setCoordinates({
          lat: placeLocation.lat(),
          lng: placeLocation.lng(),
        });
      });
    } catch {
      setIsAutocompleteAvailable(false);
    }
  }, [isMapsReady, isAutocompleteAvailable]);

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      id: category.id,
      label: category.name[locale],
    }));
  }, [categories, locale]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      categoryId: defaultCategory,
      name: '',
      description: '',
      address: '',
      phone: '',
      email: '',
    });
    setCoordinates(null);
    setSelectedDays([]);
    setOpenTime('09:00');
    setCloseTime('14:00');
  };

  const dayOptions = [
    { id: 'L', label: t('dayMon') },
    { id: 'M', label: t('dayTue') },
    { id: 'X', label: t('dayWed') },
    { id: 'J', label: t('dayThu') },
    { id: 'V', label: t('dayFri') },
    { id: 'S', label: t('daySat') },
    { id: 'D', label: t('daySun') },
  ];

  const timeOptions = useMemo(() => {
    const options: string[] = [];
    for (let hour = 0; hour < 24; hour += 1) {
      options.push(`${String(hour).padStart(2, '0')}:00`);
      options.push(`${String(hour).padStart(2, '0')}:30`);
    }
    return options;
  }, []);

  const toggleDay = (dayId: string) => {
    setSelectedDays((prev) => (
      prev.includes(dayId) ? prev.filter((day) => day !== dayId) : [...prev, dayId]
    ));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (selectedDays.length === 0) {
      setError(t('volunteerResourceScheduleRequired'));
      return;
    }

    if (openTime >= closeTime) {
      setError(t('volunteerResourceScheduleRangeError'));
      return;
    }

    setIsSaving(true);

    try {
      let resolvedCoordinates = coordinates;

      if (!resolvedCoordinates && isMapsReady && form.address.trim()) {
        resolvedCoordinates = await new Promise<{ lat: number; lng: number } | null>((resolve) => {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: form.address.trim() }, (results, status) => {
            const firstResult = results?.[0]?.geometry?.location;
            if (status === 'OK' && firstResult) {
              resolve({ lat: firstResult.lat(), lng: firstResult.lng() });
              return;
            }
            resolve(null);
          });
        });
      }

      if (!resolvedCoordinates) {
        setError(t('volunteerResourceAddressPickRequired'));
        return;
      }

      const hours = `${selectedDays.join(', ')} (${openTime} - ${closeTime})`;

      const resource = await addVolunteerResource({
        categoryId: form.categoryId,
        name: form.name,
        description: form.description,
        address: form.address,
        phone: form.phone,
        email: form.email,
        hours,
        lat: resolvedCoordinates.lat,
        lng: resolvedCoordinates.lng,
      });

      onResourceAdded(resource);
      setMessage(t('volunteerResourceSaved'));
      resetForm();
    } catch (submitError) {
      const errorMessage = submitError instanceof Error ? submitError.message : '';
      if (errorMessage === 'permission-denied') {
        setError(t('volunteerResourceNoPermission'));
      } else {
        setError(t('volunteerResourceSaveError'));
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm text-text-main">
          <span className="mb-1 block">{t('volunteerResourceCategory')}</span>
          <select
            value={form.categoryId}
            onChange={(e) => updateField('categoryId', e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
            required
          >
            {categoryOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-text-main">
          <span className="mb-1 block">{t('volunteerResourceName')}</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
            required
          />
        </label>
      </div>

      <label className="block text-sm text-text-main">
        <span className="mb-1 block">{t('volunteerResourceDescription')}</span>
        <textarea
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
          required
        />
      </label>

      <label className="block text-sm text-text-main">
        <span className="mb-1 block">{t('volunteerResourceAddress')}</span>
        <input
          ref={addressInputRef}
          type="text"
          value={form.address}
          onChange={(e) => {
            updateField('address', e.target.value);
            setCoordinates(null);
          }}
          placeholder={t('volunteerResourceAddressPlaceholder')}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
          required
        />
        {!isMapsReady && <p className="mt-1 text-xs text-text-light">{t('volunteerResourceAddressLoading')}</p>}
        {isMapsReady && !isAutocompleteAvailable && (
          <p className="mt-1 text-xs text-text-light">{t('volunteerResourceAddressManualHint')}</p>
        )}
      </label>

      <div className="grid gap-3 md:grid-cols-3">
        <label className="text-sm text-text-main">
          <span className="mb-1 block">{t('volunteerResourcePhone')}</span>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
          />
        </label>

        <label className="text-sm text-text-main">
          <span className="mb-1 block">{t('volunteerResourceEmail')}</span>
          <input
            type="text"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
          />
        </label>

      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-text-main">{t('volunteerResourceSchedule')}</p>
        <div className="flex flex-wrap gap-2">
          {dayOptions.map((day) => (
            <label
              key={day.id}
              className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors ${
                selectedDays.includes(day.id)
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 text-text-main hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedDays.includes(day.id)}
                onChange={() => toggleDay(day.id)}
                className="sr-only"
              />
              {day.label}
            </label>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm text-text-main">
            <span className="mb-1 block">{t('volunteerResourceOpen')}</span>
            <select
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
            >
              {timeOptions.map((time) => (
                <option key={`open-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-text-main">
            <span className="mb-1 block">{t('volunteerResourceClose')}</span>
            <select
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
            >
              {timeOptions.map((time) => (
                <option key={`close-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSaving}
        className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? t('loading') : t('volunteerResourceSave')}
      </button>
    </form>
  );
};

export default AddResourceModule;
