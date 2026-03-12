import { FirebaseError } from 'firebase/app';
import {
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  collection,
} from 'firebase/firestore';
import { db, isFirebaseAuthConfigured } from './firebaseClient';
import {
  applyAdjustments,
  createEmptySupplyValues,
  normalizeSupplyValues,
  type SupplyValues,
} from './supplyCalculations';

export interface RouteConfig {
  routeId: string;
  displayName: string;
  active: boolean;
  baseWeekly: SupplyValues;
  updatedAt?: string;
  updatedBy?: string;
}

export interface RouteSupplyWeek {
  routeId: string;
  weekKey: string;
  base: SupplyValues;
  adjustments: SupplyValues;
  final: SupplyValues;
  updatedBy?: string;
  updatedAt?: string;
  createdAt?: string;
}

export const ROUTE_IDS = [
  'ruta-1',
  'ruta-2',
  'ruta-3',
  'ruta-4',
  'ruta-5',
  'ruta-6',
  'ruta-7',
  'ruta-8',
  'ruta-9',
] as const;

export const DEFAULT_ROUTES_CONFIG: Record<string, RouteConfig> = ROUTE_IDS.reduce((acc, routeId, index) => {
  acc[routeId] = {
    routeId,
    displayName: `Ruta ${index + 1}`,
    active: true,
    baseWeekly: {
      tortilla: 5,
      pavo: 4,
      zumos: 1,
      gazpacho: 0,
      caldo: 1,
      fruta: 0,
      cafeConLeche: 0.5,
      cafeSolo: 0,
    },
  };
  return acc;
}, {} as Record<string, RouteConfig>);

const routeWeekDocId = (routeId: string, weekKey: string): string => `${routeId}_${weekKey}`;

const mapRouteConfig = (routeId: string, data: any): RouteConfig => {
  const fallback = DEFAULT_ROUTES_CONFIG[routeId];
  return {
    routeId,
    displayName: typeof data?.displayName === 'string' ? data.displayName : fallback.displayName,
    active: typeof data?.active === 'boolean' ? data.active : true,
    baseWeekly: normalizeSupplyValues(data?.baseWeekly || fallback.baseWeekly),
    updatedAt: typeof data?.updatedAt === 'string' ? data.updatedAt : undefined,
    updatedBy: typeof data?.updatedBy === 'string' ? data.updatedBy : undefined,
  };
};

const mapRouteSupplyWeek = (routeId: string, weekKey: string, data: any, baseFallback: SupplyValues): RouteSupplyWeek => {
  const base = normalizeSupplyValues(data?.base || baseFallback);
  const adjustments = normalizeSupplyValues(data?.adjustments);
  const final = normalizeSupplyValues(data?.final || applyAdjustments(base, adjustments));

  return {
    routeId,
    weekKey,
    base,
    adjustments,
    final,
    updatedBy: typeof data?.updatedBy === 'string' ? data.updatedBy : undefined,
    updatedAt: typeof data?.updatedAt === 'string' ? data.updatedAt : undefined,
    createdAt: typeof data?.createdAt === 'string' ? data.createdAt : undefined,
  };
};

const getLatestFinalForRoute = async (routeId: string): Promise<SupplyValues | null> => {
  if (!isFirebaseAuthConfigured || !db) {
    return null;
  }

  try {
    const snapshot = await getDocs(query(collection(db, 'routeSupplyWeeks'), where('routeId', '==', routeId)));
    let latestWeekKey = '';
    let latestFinal: SupplyValues | null = null;

    snapshot.docs.forEach((item) => {
      const data = item.data();
      const candidateWeek = typeof data?.weekKey === 'string' ? data.weekKey : '';
      if (!candidateWeek || candidateWeek <= latestWeekKey) {
        return;
      }
      latestWeekKey = candidateWeek;
      latestFinal = normalizeSupplyValues(data?.final);
    });

    return latestFinal;
  } catch (error) {
    return toFirebaseError(error);
  }
};

const toFirebaseError = (error: unknown): never => {
  if (error instanceof FirebaseError) {
    throw new Error(error.code);
  }
  throw error;
};

export const getCurrentISOWeekKey = (date = new Date()): string => {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((utc.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
};

export const getRouteConfig = async (routeId: string): Promise<RouteConfig> => {
  const fallback = DEFAULT_ROUTES_CONFIG[routeId];
  if (!fallback) {
    throw new Error('invalid-route');
  }

  if (!isFirebaseAuthConfigured || !db) {
    return fallback;
  }

  try {
    const snapshot = await getDoc(doc(db, 'routesConfig', routeId));
    if (!snapshot.exists()) {
      return fallback;
    }
    return mapRouteConfig(routeId, snapshot.data());
  } catch (error) {
    return toFirebaseError(error);
  }
};

export const saveRouteConfig = async (
  routeId: string,
  baseWeekly: SupplyValues,
  updatedBy: string
): Promise<RouteConfig> => {
  const fallback = DEFAULT_ROUTES_CONFIG[routeId];
  if (!fallback) {
    throw new Error('invalid-route');
  }
  if (!isFirebaseAuthConfigured || !db) {
    throw new Error('firebase-not-configured');
  }

  const now = new Date().toISOString();
  const payload: RouteConfig = {
    routeId,
    displayName: fallback.displayName,
    active: true,
    baseWeekly: normalizeSupplyValues(baseWeekly),
    updatedBy,
    updatedAt: now,
  };

  try {
    await setDoc(doc(db, 'routesConfig', routeId), payload, { merge: true });
    return payload;
  } catch (error) {
    return toFirebaseError(error);
  }
};

export const getRouteWeekState = async (routeId: string, weekKey: string): Promise<RouteSupplyWeek> => {
  if (!DEFAULT_ROUTES_CONFIG[routeId]) {
    throw new Error('invalid-route');
  }

  const config = await getRouteConfig(routeId);
  if (!isFirebaseAuthConfigured || !db) {
    return {
      routeId,
      weekKey,
      base: config.baseWeekly,
      adjustments: createEmptySupplyValues(),
      final: config.baseWeekly,
    };
  }

  try {
    const snapshot = await getDoc(doc(db, 'routeSupplyWeeks', routeWeekDocId(routeId, weekKey)));
    if (!snapshot.exists()) {
      const latestFinal = await getLatestFinalForRoute(routeId);
      const startingBase = latestFinal || config.baseWeekly;
      return {
        routeId,
        weekKey,
        base: startingBase,
        adjustments: createEmptySupplyValues(),
        final: startingBase,
      };
    }

    return mapRouteSupplyWeek(routeId, weekKey, snapshot.data(), config.baseWeekly);
  } catch (error) {
    return toFirebaseError(error);
  }
};

export const saveRouteWeekState = async (state: RouteSupplyWeek, updatedBy: string): Promise<RouteSupplyWeek> => {
  if (!DEFAULT_ROUTES_CONFIG[state.routeId]) {
    throw new Error('invalid-route');
  }
  if (!isFirebaseAuthConfigured || !db) {
    throw new Error('firebase-not-configured');
  }

  const now = new Date().toISOString();
  const normalizedState: RouteSupplyWeek = {
    ...state,
    base: normalizeSupplyValues(state.base),
    adjustments: normalizeSupplyValues(state.adjustments),
    final: normalizeSupplyValues(applyAdjustments(state.base, state.adjustments)),
    updatedBy,
    updatedAt: now,
    createdAt: state.createdAt || now,
  };

  try {
    await setDoc(doc(db, 'routeSupplyWeeks', routeWeekDocId(state.routeId, state.weekKey)), normalizedState, { merge: true });
    return normalizedState;
  } catch (error) {
    return toFirebaseError(error);
  }
};

export const getGlobalWeekStates = async (weekKey: string): Promise<Record<string, RouteSupplyWeek>> => {
  const result = ROUTE_IDS.reduce((acc, routeId) => {
    const routeConfig = DEFAULT_ROUTES_CONFIG[routeId];
    acc[routeId] = {
      routeId,
      weekKey,
      base: routeConfig.baseWeekly,
      adjustments: createEmptySupplyValues(),
      final: routeConfig.baseWeekly,
    };
    return acc;
  }, {} as Record<string, RouteSupplyWeek>);

  if (!isFirebaseAuthConfigured || !db) {
    return result;
  }

  try {
    const snapshot = await getDocs(query(collection(db, 'routeSupplyWeeks'), where('weekKey', '==', weekKey)));
    snapshot.docs.forEach((item) => {
      const data = item.data();
      const routeId = data?.routeId;
      if (typeof routeId !== 'string' || !result[routeId]) {
        return;
      }

      const baseFallback = result[routeId].base;
      result[routeId] = mapRouteSupplyWeek(routeId, weekKey, data, baseFallback);
    });

    return result;
  } catch (error) {
    return toFirebaseError(error);
  }
};

export const updateRouteWeekBase = async (
  routeId: string,
  weekKey: string,
  base: SupplyValues,
  updatedBy: string
): Promise<RouteSupplyWeek> => {
  const current = await getRouteWeekState(routeId, weekKey);
  const nextState: RouteSupplyWeek = {
    ...current,
    base: normalizeSupplyValues(base),
    final: applyAdjustments(normalizeSupplyValues(base), current.adjustments),
  };
  return saveRouteWeekState(nextState, updatedBy);
};

export const updateRouteWeekAdjustments = async (
  routeId: string,
  weekKey: string,
  adjustments: SupplyValues,
  updatedBy: string
): Promise<RouteSupplyWeek> => {
  const current = await getRouteWeekState(routeId, weekKey);
  const nextAdjustments = normalizeSupplyValues(adjustments);
  const nextState: RouteSupplyWeek = {
    ...current,
    adjustments: nextAdjustments,
    final: applyAdjustments(current.base, nextAdjustments),
  };
  return saveRouteWeekState(nextState, updatedBy);
};
