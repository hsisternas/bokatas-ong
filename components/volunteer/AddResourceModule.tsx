import React from 'react';
import type { Category, Resource } from '../../types';
import { toPublicResource } from '../../domain/resource';
import { getResourceRecord, saveVolunteerResource } from '../../services/canonicalResourceService';
import ResourceForm from '../resources/ResourceForm';

interface AddResourceModuleProps { categories: Category[]; onResourceAdded: (resource: Resource) => void; }

const AddResourceModule: React.FC<AddResourceModuleProps> = ({ categories, onResourceAdded }) => {
  const save = async (input: Parameters<typeof saveVolunteerResource>[0]) => {
    const id = await saveVolunteerResource(input);
    const record = await getResourceRecord(id);
    if (record) onResourceAdded(toPublicResource(record, 'es'));
  };
  return <div><h3 className="mb-2 text-lg font-bold">Añadir recurso</h3><p className="mb-4 text-sm text-text-light">Se publica directamente como recurso validado por Bokatas.</p><ResourceForm categories={categories} submitLabel="Publicar recurso" onSubmit={save} /></div>;
};

export default AddResourceModule;
