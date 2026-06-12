import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Category, Resource } from '../../types';
import { useTranslation } from '../../contexts/LanguageContext';
import { loadGoogleMapsScript } from '../../services/googleMapsLoader';
import { saveResourceEdition } from '../../services/resourceStoreService';

interface EditResourceModuleProps {
  categories: Category[];
  resources: Resource[];
  onResourceUpdated: (resource: Resource) => void;
}

const EditResourceModule: React.FC<EditResourceModuleProps> = ({ categories, resources, onResourceUpdated }) => {
  const { t, locale } = useTranslation();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id || 'otros');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => resource.categoryId === selectedCategoryId);
  }, [resources, selectedCategoryId]);

  const selectedResource = useMemo(() => {
    return filteredResources.find((resource) => resource.id === selectedResourceId) || null;
  }, [filteredResources, selectedResourceId]);
  const selectedCategory = useMemo(() => {
    return categories.find((category) => category.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    hours: '',
  });

  useEffect(() => {
    const handlePointerDownOutside = (event: PointerEvent) => {
      if (!categoryDropdownRef.current) {
        return;
      }
      if (!categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);
    return () => document.removeEventListener('pointerdown', handlePointerDownOutside);
  }, []);

  const openResource = (resource: Resource) => {
    if (selectedResourceId === resource.id) {
      setSelectedResourceId(null);
      setMessage(null);
      setError(null);
      return;
    }

    setSelectedResourceId(resource.id);
    setForm({
      name: resource.name[locale] || resource.name.es,
      description: resource.description[locale] || resource.description.es,
      address: resource.address,
      phone: resource.phone,
      email: resource.email,
      hours: resource.hours,
    });
    setMessage(null);
    setError(null);
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      await loadGoogleMapsScript();
      return await new Promise((resolve) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          const location = results?.[0]?.geometry?.location;
          if (status === 'OK' && location) {
            resolve({ lat: location.lat(), lng: location.lng() });
            return;
          }
          resolve(null);
        });
      });
    } catch {
      return null;
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedResource) {
      return;
    }

    setMessage(null);
    setError(null);
    setIsSaving(true);

    try {
      const geocodedCoords = await geocodeAddress(form.address.trim());
      const updatedResource: Resource = {
        ...selectedResource,
        categoryId: selectedCategoryId,
        name: {
          ...selectedResource.name,
          [locale]: form.name.trim(),
        },
        description: {
          ...selectedResource.description,
          [locale]: form.description.trim(),
        },
        address: form.address.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        hours: form.hours.trim(),
        coordinates: geocodedCoords || selectedResource.coordinates,
      };

      const savedResource = await saveResourceEdition(updatedResource);
      onResourceUpdated(savedResource);
      setMessage(t('volunteerResourceUpdated'));
    } catch (saveError) {
      const code = saveError instanceof Error ? saveError.message : '';
      if (code === 'permission-denied') {
        setError(t('volunteerResourceNoPermission'));
      } else {
        setError(t('volunteerResourceUpdateError'));
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm text-text-main">{t('volunteerResourceCategory')}</p>
        <div className="relative" ref={categoryDropdownRef}>
          <button
            onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
            type="button"
            className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text-main dark:border-gray-700 dark:bg-gray-800"
          >
            <span className="flex items-center gap-2">
              {selectedCategory ? <selectedCategory.icon className="text-base" /> : null}
              <span>{selectedCategory ? selectedCategory.name[locale] : t('volunteerResourceCategory')}</span>
            </span>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </button>

          {isCategoryDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              {categories.map((category) => {
                const CategoryIcon = category.icon;
                const isActive = selectedCategoryId === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategoryId(category.id);
                      setSelectedResourceId(null);
                      setMessage(null);
                      setError(null);
                      setIsCategoryDropdownOpen(false);
                    }}
                    type="button"
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? 'bg-secondary text-primary-dark'
                        : 'text-text-main hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <CategoryIcon className="text-base" />
                    <span>{category.name[locale]}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="space-y-2">
            <button
              onClick={() => openResource(resource)}
              type="button"
              className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                selectedResourceId === resource.id
                  ? 'border-primary bg-secondary text-text-main'
                  : 'border-gray-200 bg-white text-text-main hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800'
              }`}
            >
              {resource.name[locale]}
            </button>

            {selectedResourceId === resource.id && selectedResource && (
              <form onSubmit={handleSave} className="space-y-3 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <label className="block text-sm text-text-main">
                  <span className="mb-1 block">{t('volunteerResourceName')}</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                    required
                  />
                </label>

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
                    type="text"
                    value={form.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                    required
                  />
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
                  <label className="text-sm text-text-main">
                    <span className="mb-1 block">{t('volunteerResourceHours')}</span>
                    <input
                      type="text"
                      value={form.hours}
                      onChange={(e) => updateField('hours', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </label>
                </div>

                {message && <p className="text-sm text-green-700">{message}</p>}
                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? t('loading') : t('volunteerResourceUpdate')}
                </button>
              </form>
            )}
          </div>
        ))}
        {filteredResources.length === 0 && (
          <p className="text-sm text-text-light">{t('noResources')}</p>
        )}
      </div>
    </div>
  );
};

export default EditResourceModule;
