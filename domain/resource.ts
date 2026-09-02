import type { Locale, Resource } from '../types';

export const RESOURCE_STATUSES = ['pending_review', 'published', 'rejected', 'withdrawal_requested', 'archived'] as const;
export type ResourceStatus = (typeof RESOURCE_STATUSES)[number];
export type ResourceProvenance = 'legacy' | 'volunteer' | 'collaborator';
export type ResourceActorRole = 'volunteer' | 'collaborator';

export interface ResourceTranslation {
  name: string;
  description: string;
  source: 'legacy' | 'machine' | 'manual';
  generatedAt?: string;
}

export interface ResourceInput {
  categoryId: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  scheduleRaw: string;
  latitude: number | null;
  longitude: number | null;
}

export interface ResourceRecord extends ResourceInput {
  id: string;
  status: ResourceStatus;
  provenance: ResourceProvenance;
  ownerUid: string | null;
  ownerDisplayName: string;
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  reviewComment: string;
  withdrawalRequestedAt: string | null;
  archivedAt: string | null;
  translations: Partial<Record<Exclude<Locale, 'es'>, ResourceTranslation>>;
  legacy?: {
    originalId: string;
    originalUpdatedLabel: string;
    original: Resource;
    migrationRunId: string;
    reviewFlags: string[];
  };
}

export interface ResourceEvent {
  type: 'submitted' | 'approved' | 'rejected' | 'withdrawal_requested' | 'archived' | 'edited';
  actorUid: string;
  actorEmail: string;
  actorRole: ResourceActorRole;
  createdAt: string;
  comment?: string;
}

export interface UserProfile {
  uid: string;
  role: 'collaborator';
  accountLifecycle: 'self-managed';
  displayName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const emptyResourceInput = (): ResourceInput => ({
  categoryId: '', name: '', description: '', address: '', phone: '', email: '', website: '', scheduleRaw: '', latitude: null, longitude: null,
});

export const toPublicResource = (record: ResourceRecord, locale: Locale): Resource => {
  const translation = locale === 'es' ? null : record.translations[locale];
  const name = translation?.name || record.name;
  const description = translation?.description || record.description;
  const localize = (value: string) => ({ es: value, en: value, it: value, ar: value, fr: value });
  return {
    id: record.id,
    categoryId: record.categoryId,
    name: localize(name),
    description: localize(description),
    address: record.address,
    phone: record.phone,
    email: record.email,
    hours: record.scheduleRaw,
    coordinates: { lat: record.latitude || 0, lng: record.longitude || 0 },
    updated: record.updatedAt.slice(0, 10),
  };
};
