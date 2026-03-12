export const SUPPLY_FIELDS = [
  'tortilla',
  'pavo',
  'zumos',
  'gazpacho',
  'caldo',
  'fruta',
  'cafeConLeche',
  'cafeSolo',
] as const;

export type SupplyField = (typeof SUPPLY_FIELDS)[number];

export type SupplyValues = Record<SupplyField, number>;

export interface SupplyRules {
  breadSandwichesPerBar: number;
  breadBarsPerPack: number;
  omeletteSandwichesPerUnit: number;
  turkeySlicesPerSandwich: number;
  juiceUnitsPerBrick: number;
  milkUnitsPerBrick: number;
  brothUnitsPerBrick: number;
}

export interface ShoppingListTotals {
  panBarras: number;
  panPacks: number;
  tortillas: number;
  lonchasPavo: number;
  briksZumo: number;
  briksGazpacho: number;
  briksCaldo: number;
  frutaTotal: number;
  briksLeche: number;
}

export const createEmptySupplyValues = (): SupplyValues => ({
  tortilla: 0,
  pavo: 0,
  zumos: 0,
  gazpacho: 0,
  caldo: 0,
  fruta: 0,
  cafeConLeche: 0,
  cafeSolo: 0,
});

export const normalizeSupplyValues = (input?: Partial<SupplyValues> | null): SupplyValues => {
  const normalized = createEmptySupplyValues();
  for (const field of SUPPLY_FIELDS) {
    const raw = input?.[field];
    normalized[field] = typeof raw === 'number' && Number.isFinite(raw) ? raw : 0;
  }
  return normalized;
};

export const applyAdjustments = (base: SupplyValues, adjustments: SupplyValues): SupplyValues => {
  const result = createEmptySupplyValues();
  for (const field of SUPPLY_FIELDS) {
    result[field] = Math.max(0, base[field] + adjustments[field]);
  }
  return result;
};

export const sumSupplyValues = (valuesList: SupplyValues[]): SupplyValues => {
  const result = createEmptySupplyValues();
  for (const values of valuesList) {
    for (const field of SUPPLY_FIELDS) {
      result[field] += values[field];
    }
  }
  return result;
};

export const getRouteSandwichTotal = (values: SupplyValues): number => values.tortilla + values.pavo;

export const calculateShoppingList = (totals: SupplyValues, rules: SupplyRules): ShoppingListTotals => {
  const totalBocadillos = totals.tortilla + totals.pavo;
  const barrasNecesarias = Math.ceil(totalBocadillos / rules.breadSandwichesPerBar);
  const packsPan = Math.ceil(barrasNecesarias / rules.breadBarsPerPack);

  return {
    panBarras: barrasNecesarias,
    panPacks: packsPan,
    tortillas: Math.ceil(totals.tortilla / rules.omeletteSandwichesPerUnit),
    lonchasPavo: Math.ceil(totals.pavo * rules.turkeySlicesPerSandwich),
    briksZumo: Math.ceil(totals.zumos / rules.juiceUnitsPerBrick),
    briksGazpacho: Math.ceil(totals.gazpacho),
    briksCaldo: Math.ceil(totals.caldo / rules.brothUnitsPerBrick),
    frutaTotal: Math.ceil(totals.fruta),
    briksLeche: Math.ceil(totals.cafeConLeche / rules.milkUnitsPerBrick),
  };
};
