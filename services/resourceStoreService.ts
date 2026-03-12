import { addDoc, collection, doc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import type { Locale, Resource } from '../types';
import { db, isFirebaseAuthConfigured } from './firebaseClient';

interface AddResourceInput {
  categoryId: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  lat: number | null;
  lng: number | null;
}

const SUPPORTED_LOCALES: Locale[] = ['es', 'en', 'it', 'ar', 'fr'];
const COLLECTION_NAME = 'resources';
const OVERRIDES_COLLECTION_NAME = 'resourceOverrides';

const localizeValue = (value: string) => {
  return SUPPORTED_LOCALES.reduce((acc, locale) => {
    acc[locale] = value;
    return acc;
  }, {} as Resource['name']);
};

const toValidCoordinate = (value: number | null): number => {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
};

const mapDocToResource = (docId: string, data: any): Resource => {
  const safeName = typeof data?.name?.es === 'string' ? data.name : localizeValue('');
  const safeDescription = typeof data?.description?.es === 'string' ? data.description : localizeValue('');

  return {
    id: data?.id || `custom-${docId}`,
    categoryId: data?.categoryId || 'otros',
    name: safeName,
    description: safeDescription,
    address: typeof data?.address === 'string' ? data.address : '',
    phone: typeof data?.phone === 'string' ? data.phone : '',
    email: typeof data?.email === 'string' ? data.email : '',
    hours: typeof data?.hours === 'string' ? data.hours : '',
    coordinates: {
      lat: typeof data?.coordinates?.lat === 'number' ? data.coordinates.lat : 0,
      lng: typeof data?.coordinates?.lng === 'number' ? data.coordinates.lng : 0,
    },
    updated: typeof data?.updated === 'string' ? data.updated : '',
  };
};

export const getVolunteerResources = async (): Promise<Resource[]> => {
  if (!isFirebaseAuthConfigured || !db) {
    return [];
  }

  const resourcesQuery = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(resourcesQuery);

  return snapshot.docs.map((doc) => mapDocToResource(doc.id, doc.data()));
};

export const getResourceOverrides = async (): Promise<Record<string, Resource>> => {
  if (!isFirebaseAuthConfigured || !db) {
    return {};
  }

  const snapshot = await getDocs(collection(db, OVERRIDES_COLLECTION_NAME));
  return snapshot.docs.reduce((acc, item) => {
    const resource = mapDocToResource(item.id, item.data());
    acc[resource.id] = resource;
    return acc;
  }, {} as Record<string, Resource>);
};

export const addVolunteerResource = async (input: AddResourceInput): Promise<Resource> => {
  if (!isFirebaseAuthConfigured || !db) {
    throw new Error('firebase-not-configured');
  }

  const now = new Date();
  const dateText = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getFullYear()).slice(-2)}`;

  const resourcePayload = {
    categoryId: input.categoryId,
    name: localizeValue(input.name.trim()),
    description: localizeValue(input.description.trim()),
    address: input.address.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    hours: input.hours.trim(),
    coordinates: {
      lat: toValidCoordinate(input.lat),
      lng: toValidCoordinate(input.lng),
    },
    updated: dateText,
    source: 'volunteer',
    createdAt: now.toISOString(),
  };

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), resourcePayload);
    return mapDocToResource(docRef.id, { ...resourcePayload, id: `custom-${docRef.id}` });
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.code);
    }
    throw error;
  }
};

const getDateText = (): string => {
  const now = new Date();
  return `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getFullYear()).slice(-2)}`;
};

const toFirestorePayload = (resource: Resource) => ({
  id: resource.id,
  categoryId: resource.categoryId,
  name: resource.name,
  description: resource.description,
  address: resource.address,
  phone: resource.phone,
  email: resource.email,
  hours: resource.hours,
  coordinates: {
    lat: toValidCoordinate(resource.coordinates.lat),
    lng: toValidCoordinate(resource.coordinates.lng),
  },
  updated: resource.updated || getDateText(),
  source: 'volunteer',
  updatedAt: new Date().toISOString(),
});

export const saveResourceEdition = async (resource: Resource): Promise<Resource> => {
  if (!isFirebaseAuthConfigured || !db) {
    throw new Error('firebase-not-configured');
  }

  const nextResource: Resource = {
    ...resource,
    updated: getDateText(),
    coordinates: {
      lat: toValidCoordinate(resource.coordinates.lat),
      lng: toValidCoordinate(resource.coordinates.lng),
    },
  };

  try {
    if (resource.id.startsWith('custom-')) {
      const docId = resource.id.replace('custom-', '');
      await updateDoc(doc(db, COLLECTION_NAME, docId), toFirestorePayload(nextResource));
      return nextResource;
    }

    await setDoc(doc(db, OVERRIDES_COLLECTION_NAME, resource.id), toFirestorePayload(nextResource), { merge: true });
    return nextResource;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.code);
    }
    throw error;
  }
};
