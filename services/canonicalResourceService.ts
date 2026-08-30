import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import type { ResourceInput, ResourceRecord } from '../domain/resource';
import { db, functions, isFirebaseAuthConfigured } from './firebaseClient';

const mapRecord = (id: string, data: Record<string, unknown>): ResourceRecord => ({
  id,
  categoryId: String(data.categoryId || 'otros'), name: String(data.name || ''), description: String(data.description || ''),
  address: String(data.address || ''), phone: String(data.phone || ''), email: String(data.email || ''), website: String(data.website || ''),
  scheduleRaw: String(data.scheduleRaw || ''), latitude: typeof data.latitude === 'number' ? data.latitude : null,
  longitude: typeof data.longitude === 'number' ? data.longitude : null, status: data.status as ResourceRecord['status'],
  provenance: data.provenance as ResourceRecord['provenance'], ownerUid: typeof data.ownerUid === 'string' ? data.ownerUid : null,
  ownerDisplayName: String(data.ownerDisplayName || ''), createdAt: String(data.createdAt || ''), updatedAt: String(data.updatedAt || ''),
  submittedAt: typeof data.submittedAt === 'string' ? data.submittedAt : null, reviewedAt: typeof data.reviewedAt === 'string' ? data.reviewedAt : null,
  reviewedBy: typeof data.reviewedBy === 'string' ? data.reviewedBy : null, reviewComment: String(data.reviewComment || ''),
  withdrawalRequestedAt: typeof data.withdrawalRequestedAt === 'string' ? data.withdrawalRequestedAt : null,
  archivedAt: typeof data.archivedAt === 'string' ? data.archivedAt : null, translations: (data.translations || {}) as ResourceRecord['translations'],
  legacy: data.legacy as ResourceRecord['legacy'],
});

const requireFirebase = () => {
  if (!db || !functions || !isFirebaseAuthConfigured) throw new Error('firebase-not-configured');
};

export const getPublishedResourceRecords = async (): Promise<ResourceRecord[]> => {
  if (!db || !isFirebaseAuthConfigured) return [];
  const result = await getDocs(query(collection(db, 'resources'), where('status', '==', 'published'), orderBy('name')));
  return result.docs.map((item) => mapRecord(item.id, item.data()));
};

export const isLegacyCatalogMigrated = async (): Promise<boolean> => {
  if (!db || !isFirebaseAuthConfigured) return false;
  const result = await getDoc(doc(db, 'catalogConfig', 'resources'));
  return result.exists() && result.data().legacyMigrationComplete === true;
};

export const getOwnedResourceRecords = async (uid: string): Promise<ResourceRecord[]> => {
  requireFirebase();
  const result = await getDocs(query(collection(db!, 'resources'), where('ownerUid', '==', uid), orderBy('updatedAt', 'desc')));
  return result.docs.map((item) => mapRecord(item.id, item.data()));
};

export const getReviewResourceRecords = async (): Promise<ResourceRecord[]> => {
  requireFirebase();
  const result = await getDocs(query(collection(db!, 'resources'), where('status', 'in', ['pending_review', 'withdrawal_requested']), orderBy('submittedAt', 'asc')));
  return result.docs.map((item) => mapRecord(item.id, item.data()));
};

/** Lightweight live count for the volunteer review entry points. */
export const subscribeToPendingReviewCount = (onCount: (count: number) => void): (() => void) => {
  if (!db || !isFirebaseAuthConfigured) {
    onCount(0);
    return () => undefined;
  }

  return onSnapshot(
    query(collection(db, 'resources'), where('status', 'in', ['pending_review', 'withdrawal_requested'])),
    (snapshot) => onCount(snapshot.size),
    () => onCount(0),
  );
};

export const getResourceRecord = async (resourceId: string): Promise<ResourceRecord | null> => {
  requireFirebase();
  const result = await getDoc(doc(db!, 'resources', resourceId));
  return result.exists() ? mapRecord(result.id, result.data()) : null;
};

export const saveContributorResource = async (resource: ResourceInput, resourceId?: string): Promise<string> => {
  requireFirebase();
  const result = await httpsCallable(functions!, 'saveContributorResource')({ resource, resourceId: resourceId || '' });
  return (result.data as { id: string }).id;
};

export const saveVolunteerResource = async (resource: ResourceInput, resourceId?: string): Promise<string> => {
  requireFirebase();
  const result = await httpsCallable(functions!, 'saveVolunteerResource')({ resource, resourceId: resourceId || '' });
  return (result.data as { id: string }).id;
};

export const requestResourceWithdrawal = async (resourceId: string): Promise<void> => {
  requireFirebase();
  await httpsCallable(functions!, 'requestResourceWithdrawal')({ resourceId });
};

export const reviewResource = async (resourceId: string, action: 'approve' | 'reject' | 'archive', comment = ''): Promise<void> => {
  requireFirebase();
  await httpsCallable(functions!, 'reviewResource')({ resourceId, action, comment });
};
