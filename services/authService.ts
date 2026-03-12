import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth, isFirebaseAuthConfigured } from './firebaseClient';

const VOLUNTEER_USER_REGEX = /^ruta-([1-9])$/;
const VOLUNTEER_EMAIL_DOMAIN = import.meta.env.VITE_VOLUNTEER_EMAIL_DOMAIN || 'voluntarios.bokatas.local';

const requireAuth = () => {
  if (!isFirebaseAuthConfigured || !auth) {
    throw new Error('Firebase auth is not configured');
  }
};

const getVolunteerEmail = (username: string): string => {
  const normalized = username.trim().toLowerCase();
  if (!VOLUNTEER_USER_REGEX.test(normalized)) {
    throw new Error('invalid-volunteer-user');
  }
  return `${normalized}@${VOLUNTEER_EMAIL_DOMAIN}`;
};

export const subscribeVolunteerSession = (callback: (email: string | null) => void) => {
  if (!isFirebaseAuthConfigured || !auth) {
    callback(null);
    return () => undefined;
  }

  return onAuthStateChanged(auth, (user) => {
    callback(user?.email ?? null);
  });
};

export const loginVolunteer = async (username: string, password: string): Promise<void> => {
  requireAuth();
  const email = getVolunteerEmail(username);
  try {
    await signInWithEmailAndPassword(auth!, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.code);
    }
    throw error;
  }
};

export const logoutVolunteer = async (): Promise<void> => {
  requireAuth();
  await signOut(auth!);
};

export const getRouteIdFromEmail = (email: string | null): string | null => {
  if (!email) {
    return null;
  }
  const username = email.split('@')[0]?.toLowerCase() || '';
  if (!VOLUNTEER_USER_REGEX.test(username)) {
    return null;
  }
  return username;
};
