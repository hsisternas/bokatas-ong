import {
  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification,
  sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, verifyBeforeUpdateEmail,
  updatePassword, updateProfile, EmailAuthProvider, reauthenticateWithCredential, type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseAuthConfigured } from './firebaseClient';
import type { UserProfile } from '../domain/resource';

export const VOLUNTEER_EMAIL_REGEX = /^ruta-([1-9])@voluntarios\.bokatas\.local$/;
export const isVolunteerUser = (user: User | null) => Boolean(user?.email && VOLUNTEER_EMAIL_REGEX.test(user.email));

const requireAuth = () => {
  if (!auth || !db || !isFirebaseAuthConfigured) throw new Error('firebase-not-configured');
};

export const ensureContributorProfile = async (user: User): Promise<UserProfile> => {
  requireAuth();
  if (isVolunteerUser(user)) throw new Error('volunteer-account');
  const ref = doc(db!, 'userProfiles', user.uid);
  const existing = await getDoc(ref);
  const displayName = user.displayName?.trim() || user.email?.split('@')[0] || 'Colaborador';
  if (!existing.exists()) {
    await setDoc(ref, { uid: user.uid, role: 'collaborator', displayName, email: user.email || '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  return { ...(existing.data() as UserProfile), uid: user.uid, role: 'collaborator', displayName, email: user.email || '', createdAt: String(existing.data()?.createdAt || new Date().toISOString()), updatedAt: new Date().toISOString() };
};

export const subscribeAuthUser = (callback: (user: User | null) => void) => {
  if (!auth) { callback(null); return () => undefined; }
  return onAuthStateChanged(auth, callback);
};

export const signUpContributor = async (email: string, password: string, displayName: string) => {
  requireAuth();
  const credential = await createUserWithEmailAndPassword(auth!, email.trim(), password);
  await updateProfile(credential.user, { displayName: displayName.trim() });
  await ensureContributorProfile(credential.user);
  await sendEmailVerification(credential.user);
  return credential.user;
};

export const signInContributorEmail = async (email: string, password: string) => {
  requireAuth();
  const credential = await signInWithEmailAndPassword(auth!, email.trim(), password);
  if (isVolunteerUser(credential.user)) throw new Error('volunteer-account');
  await ensureContributorProfile(credential.user);
  return credential.user;
};

export const signInContributorGoogle = async () => {
  requireAuth();
  const credential = await signInWithPopup(auth!, new GoogleAuthProvider());
  if (isVolunteerUser(credential.user)) throw new Error('volunteer-account');
  await ensureContributorProfile(credential.user);
  return credential.user;
};

export const resetContributorPassword = async (email: string) => {
  requireAuth();
  await sendPasswordResetEmail(auth!, email.trim());
};

export const updateContributorProfile = async (user: User, displayName: string) => {
  requireAuth();
  await updateProfile(user, { displayName: displayName.trim() });
  await setDoc(doc(db!, 'userProfiles', user.uid), { displayName: displayName.trim(), updatedAt: new Date().toISOString() }, { merge: true });
};

export const changeContributorPassword = async (user: User, currentPassword: string, nextPassword: string) => {
  if (!user.email) throw new Error('missing-email');
  await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPassword));
  await updatePassword(user, nextPassword);
};

export const changeContributorEmail = async (user: User, currentPassword: string, nextEmail: string) => {
  if (!user.email) throw new Error('missing-email');
  await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPassword));
  await verifyBeforeUpdateEmail(user, nextEmail.trim());
};

export const logoutAuthenticatedUser = async () => { if (auth) await signOut(auth); };
