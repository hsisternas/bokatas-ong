import React, { useMemo, useState } from 'react';
import type { Category, Resource } from '../../types';
import { emptyResourceInput } from '../../domain/resource';
import { getResourceRecord, saveVolunteerResource } from '../../services/canonicalResourceService';
import ResourceForm from '../resources/ResourceForm';

interface EditResourceModuleProps { categories: Category[]; resources: Resource[]; onResourceUpdated: (resource: Resource) => void; }

const EditResourceModule: React.FC<EditResourceModuleProps> = ({ categories, resources, onResourceUpdated }) => {
  const [selectedId, setSelectedId] = useState('');
  const selected = useMemo(() => resources.find((resource) => resource.id === selectedId), [resources, selectedId]);
  if (selected) {
    const initial = { ...emptyResourceInput(), categoryId: selected.categoryId, name: selected.name.es, description: selected.description.es, address: selected.address, phone: selected.phone, email: selected.email, scheduleRaw: selected.hours, latitude: selected.coordinates.lat || null, longitude: selected.coordinates.lng || null };
    const save = async (input: typeof initial) => {
      await saveVolunteerResource(input, selected.id);
      const saved = await getResourceRecord(selected.id);
      if (saved) onResourceUpdated({ ...selected, categoryId: saved.categoryId, name: { ...selected.name, es: saved.name }, description: { ...selected.description, es: saved.description }, address: saved.address, phone: saved.phone, email: saved.email, hours: saved.scheduleRaw, coordinates: { lat: saved.latitude || 0, lng: saved.longitude || 0 } });
      setSelectedId('');
    };
    return <div><button className="link-button mb-4" onClick={() => setSelectedId('')}>← Elegir otro recurso</button><ResourceForm categories={categories} initialValue={initial} submitLabel="Guardar cambios" onSubmit={save} onCancel={() => setSelectedId('')} /></div>;
  }
  return <div><h3 className="mb-3 text-lg font-bold">Editar recurso publicado</h3><label className="form-label">Recurso<select className="form-control" value={selectedId} onChange={(event) => setSelectedId(event.target.value)}><option value="">Selecciona un recurso</option>{resources.map((resource) => <option key={resource.id} value={resource.id}>{resource.name.es}</option>)}</select></label></div>;
};

export default EditResourceModule;
