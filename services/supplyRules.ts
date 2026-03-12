import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseAuthConfigured } from './firebaseClient';
import type { SupplyRules } from './supplyCalculations';

const DEFAULT_SUPPLY_RULES: SupplyRules = {
  breadSandwichesPerBar: 3,
  breadBarsPerPack: 2,
  omeletteSandwichesPerUnit: 6,
  turkeySlicesPerSandwich: 3,
  juiceUnitsPerBrick: 1.5,
  milkUnitsPerBrick: 1.5,
  brothUnitsPerBrick: 1,
};

const toPositiveNumber = (value: unknown, fallback: number): number => {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : fallback;
};

export const getSupplyRules = async (): Promise<SupplyRules> => {
  if (!isFirebaseAuthConfigured || !db) {
    return DEFAULT_SUPPLY_RULES;
  }

  const snapshot = await getDoc(doc(db, 'supplyRules', 'global'));
  if (!snapshot.exists()) {
    return DEFAULT_SUPPLY_RULES;
  }

  const data = snapshot.data();
  return {
    breadSandwichesPerBar: toPositiveNumber(data?.breadSandwichesPerBar, DEFAULT_SUPPLY_RULES.breadSandwichesPerBar),
    breadBarsPerPack: toPositiveNumber(data?.breadBarsPerPack, DEFAULT_SUPPLY_RULES.breadBarsPerPack),
    omeletteSandwichesPerUnit: toPositiveNumber(data?.omeletteSandwichesPerUnit, DEFAULT_SUPPLY_RULES.omeletteSandwichesPerUnit),
    turkeySlicesPerSandwich: toPositiveNumber(data?.turkeySlicesPerSandwich, DEFAULT_SUPPLY_RULES.turkeySlicesPerSandwich),
    juiceUnitsPerBrick: toPositiveNumber(data?.juiceUnitsPerBrick, DEFAULT_SUPPLY_RULES.juiceUnitsPerBrick),
    milkUnitsPerBrick: toPositiveNumber(data?.milkUnitsPerBrick, DEFAULT_SUPPLY_RULES.milkUnitsPerBrick),
    brothUnitsPerBrick: toPositiveNumber(data?.brothUnitsPerBrick, DEFAULT_SUPPLY_RULES.brothUnitsPerBrick),
  };
};
