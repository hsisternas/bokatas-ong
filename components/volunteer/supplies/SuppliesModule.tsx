import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../../../contexts/LanguageContext';
import {
  applyAdjustments,
  calculateShoppingList,
  createEmptySupplyValues,
  getRouteSandwichTotal,
  normalizeSupplyValues,
  SUPPLY_FIELDS,
  sumSupplyValues,
  type SupplyField,
  type SupplyValues,
} from '../../../services/supplyCalculations';
import { getSupplyRules } from '../../../services/supplyRules';
import {
  DEFAULT_ROUTES_CONFIG,
  getCurrentISOWeekKey,
  getGlobalWeekStates,
  getRouteWeekState,
  ROUTE_IDS,
  updateRouteWeekAdjustments,
  type RouteSupplyWeek,
} from '../../../services/supplyService';

type SuppliesTab = 'my-route' | 'global-summary' | 'shopping-list';

interface SuppliesModuleProps {
  routeId: string;
  userEmail: string;
}

const fieldLabelKeyMap: Record<SupplyField, string> = {
  tortilla: 'supplyTortilla',
  pavo: 'supplyPavo',
  zumos: 'supplyZumos',
  gazpacho: 'supplyGazpacho',
  caldo: 'supplyCaldo',
  fruta: 'supplyFruta',
  cafeConLeche: 'supplyCafeConLeche',
  cafeSolo: 'supplyCafeSolo',
};

const formatRouteName = (routeId: string): string => {
  return DEFAULT_ROUTES_CONFIG[routeId]?.displayName || routeId;
};

const formatNumber = (value: number): string => value.toFixed(1).replace('.0', '');

const SuppliesModule: React.FC<SuppliesModuleProps> = ({ routeId, userEmail }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<SuppliesTab>('my-route');
  const [weekKey, setWeekKey] = useState<string>(getCurrentISOWeekKey());
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingWeek, setIsSavingWeek] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [base, setBase] = useState<SupplyValues>(createEmptySupplyValues());
  const [adjustments, setAdjustments] = useState<SupplyValues>(createEmptySupplyValues());
  const [globalWeekStates, setGlobalWeekStates] = useState<Record<string, RouteSupplyWeek>>({});
  const summaryPrintRef = useRef<HTMLDivElement | null>(null);
  const shoppingPrintRef = useRef<HTMLDivElement | null>(null);
  const [rules, setRules] = useState({
    breadSandwichesPerBar: 3,
    breadBarsPerPack: 2,
    omeletteSandwichesPerUnit: 6,
    turkeySlicesPerSandwich: 3,
    juiceUnitsPerBrick: 1.5,
    milkUnitsPerBrick: 1.5,
    brothUnitsPerBrick: 1,
  });

  const finalValues = useMemo(() => applyAdjustments(base, adjustments), [base, adjustments]);

  const loadWeek = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const [myWeek, globalStates, supplyRules] = await Promise.all([
        getRouteWeekState(routeId, weekKey),
        getGlobalWeekStates(weekKey),
        getSupplyRules(),
      ]);
      setBase(normalizeSupplyValues(myWeek.base));
      setAdjustments(normalizeSupplyValues(myWeek.adjustments));
      setGlobalWeekStates(globalStates);
      setRules(supplyRules);
    } catch {
      setError(t('supplyLoadError'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeId, weekKey]);

  const changeAdjustmentByStep = (field: SupplyField, step: number) => {
    setAdjustments((prev) => ({
      ...prev,
      [field]: prev[field] + step,
    }));
  };

  const handleSaveWeek = async () => {
    setIsSavingWeek(true);
    setError(null);
    setSuccess(null);
    try {
      const updatedWeek = await updateRouteWeekAdjustments(routeId, weekKey, adjustments, userEmail);
      setAdjustments(updatedWeek.adjustments);
      setGlobalWeekStates((prev) => ({ ...prev, [routeId]: updatedWeek }));
      setSuccess(t('supplyWeekSaved'));
    } catch {
      setError(t('supplySaveError'));
    } finally {
      setIsSavingWeek(false);
    }
  };

  const globalTotals = useMemo(() => {
    const finals = ROUTE_IDS.map((id) => globalWeekStates[id]?.final || DEFAULT_ROUTES_CONFIG[id].baseWeekly);
    return sumSupplyValues(finals);
  }, [globalWeekStates]);

  const shoppingList = useMemo(() => calculateShoppingList(globalTotals, rules), [globalTotals, rules]);

  const summaryColumns = ROUTE_IDS.map((id) => ({
    routeId: id,
    displayName: formatRouteName(id),
    final: globalWeekStates[id]?.final || DEFAULT_ROUTES_CONFIG[id].baseWeekly,
  }));

  const getExportActionLabel = () => t('print');

  const buildPrintableHtml = (title: string, contentHtml: string) => `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 16px; color: #111827; }
          h1 { font-size: 20px; margin: 0 0 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border: 1px solid #d1d5db; padding: 8px; font-size: 12px; vertical-align: top; }
          th { background: #f3f4f6; text-align: left; }
          button { display: none !important; }
          input { border: none; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div>${contentHtml}</div>
        <script>
          window.addEventListener('load', () => {
            setTimeout(() => window.print(), 250);
          });
        </script>
      </body>
    </html>
  `;

  const printSection = (title: string, ref: React.RefObject<HTMLDivElement | null>) => {
    const content = ref.current;
    if (!content) {
      window.print();
      return;
    }
    const printableHtml = buildPrintableHtml(title, content.innerHTML);

    const popup = window.open('', '_blank', 'noopener,noreferrer');
    if (popup) {
      popup.document.open();
      popup.document.write(printableHtml);
      popup.document.close();
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(iframe);

    const frameWindow = iframe.contentWindow;
    const frameDoc = frameWindow?.document;
    if (!frameWindow || !frameDoc) {
      document.body.removeChild(iframe);
      window.print();
      return;
    }

    frameDoc.open();
    frameDoc.write(printableHtml);
    frameDoc.close();

    const cleanup = () => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    };

    frameWindow.onafterprint = cleanup;

    setTimeout(() => {
      frameWindow.focus();
      frameWindow.print();
      // Fallback cleanup for browsers that do not fire onafterprint reliably.
      setTimeout(cleanup, 60000);
    }, 200);
  };

  const renderMyRoute = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <label className="text-sm text-text-main">
            <span className="mb-1 block font-medium">{t('supplyWeek')}</span>
            <input
              type="week"
              value={weekKey}
              onChange={(event) => setWeekKey(event.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
            />
          </label>
        </div>

        <p className="text-sm text-text-light">
          {t('volunteerWelcome')}: <span className="font-semibold text-text-main">{formatRouteName(routeId)}</span>
        </p>

        <div className="space-y-3">
          {SUPPLY_FIELDS.map((field) => (
            <div key={field} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-text-main">{t(fieldLabelKeyMap[field])}</p>
                {adjustments[field] === 0 ? (
                  <p className="text-2xl font-bold leading-none text-text-main">{formatNumber(finalValues[field])}</p>
                ) : (
                  <div className="flex items-end gap-2 text-right">
                    <p className="text-sm leading-none text-gray-500 dark:text-gray-400">{formatNumber(base[field])}</p>
                    <p className="text-2xl font-bold leading-none text-primary">{formatNumber(finalValues[field])}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => changeAdjustmentByStep(field, -1)}
                  className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-2xl font-bold text-text-main dark:border-gray-600 dark:bg-gray-700"
                  type="button"
                >
                  {adjustments[field] < 0 ? `-${formatNumber(Math.abs(adjustments[field]))}` : '-'}
                </button>
                <button
                  onClick={() => changeAdjustmentByStep(field, 1)}
                  className="rounded-xl bg-primary px-4 py-3 text-2xl font-bold text-white"
                  type="button"
                >
                  {adjustments[field] > 0 ? `+${formatNumber(adjustments[field])}` : '+'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleSaveWeek}
            disabled={isSavingWeek || isLoading}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            type="button"
          >
            {isSavingWeek ? t('loading') : t('supplySaveWeek')}
          </button>
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <div ref={summaryPrintRef} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-main">{t('supplyGlobalSummary')}</h3>
          <button onClick={() => printSection(t('supplyGlobalSummary'), summaryPrintRef)} className="rounded-lg border px-3 py-2 text-sm" type="button">
            {getExportActionLabel()}
          </button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-secondary dark:bg-gray-800">
              <tr>
                <th className="px-3 py-2 text-left">{t('supplyItem')}</th>
                {summaryColumns.map((column) => (
                  <th key={column.routeId} className="px-3 py-2 text-center">
                    {column.displayName}
                  </th>
                ))}
                <th className="px-3 py-2 text-center">{t('total')}</th>
              </tr>
            </thead>
            <tbody>
              {SUPPLY_FIELDS.map((field) => (
                <tr key={field} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-2">{t(fieldLabelKeyMap[field])}</td>
                  {summaryColumns.map((column) => (
                    <td key={`${column.routeId}_${field}`} className="px-3 py-2 text-center">
                      {column.final[field].toFixed(1).replace('.0', '')}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-center font-semibold">{globalTotals[field].toFixed(1).replace('.0', '')}</td>
                </tr>
              ))}
              <tr className="border-t border-gray-200 bg-gray-50 font-semibold dark:border-gray-700 dark:bg-gray-800">
                <td className="px-3 py-2">{t('supplyTotalBocadillos')}</td>
                {summaryColumns.map((column) => (
                  <td key={`${column.routeId}_bocadillos`} className="px-3 py-2 text-center">
                    {getRouteSandwichTotal(column.final).toFixed(1).replace('.0', '')}
                  </td>
                ))}
                <td className="px-3 py-2 text-center">{(globalTotals.tortilla + globalTotals.pavo).toFixed(1).replace('.0', '')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderShoppingList = () => {
    const entries = [
      {
        label: t('shoppingPanBarras'),
        value: shoppingList.panBarras,
        unit: t('shoppingUnitBars'),
        description: t('shoppingPanBarrasDescription'),
      },
      {
        label: t('shoppingPanPacks'),
        value: shoppingList.panPacks,
        unit: t('shoppingUnitPack2'),
        description: t('shoppingPanPacksDescription'),
      },
      {
        label: t('shoppingTortillas'),
        value: shoppingList.tortillas,
        unit: t('shoppingUnitUnits'),
        description: t('shoppingTortillasDescription'),
      },
      {
        label: t('shoppingPavoSlices'),
        value: shoppingList.lonchasPavo,
        unit: t('shoppingUnitSlices'),
        description: t('shoppingPavoSlicesDescription'),
      },
      {
        label: t('shoppingZumoBriks'),
        value: shoppingList.briksZumo,
        unit: t('shoppingUnitBriks'),
        description: t('shoppingZumoBriksDescription'),
      },
      {
        label: t('shoppingGazpachoBriks'),
        value: shoppingList.briksGazpacho,
        unit: t('shoppingUnitBriks'),
        description: t('shoppingGazpachoBriksDescription'),
      },
      {
        label: t('shoppingCaldoBriks'),
        value: shoppingList.briksCaldo,
        unit: t('shoppingUnitBriks'),
        description: t('shoppingCaldoBriksDescription'),
      },
      {
        label: t('shoppingLecheBriks'),
        value: shoppingList.briksLeche,
        unit: t('shoppingUnitBriks'),
        description: t('shoppingLecheBriksDescription'),
      },
      {
        label: t('shoppingFrutaTotal'),
        value: shoppingList.frutaTotal,
        unit: t('shoppingUnitEuros'),
        description: t('shoppingFrutaTotalDescription'),
      },
    ];

    return (
      <div ref={shoppingPrintRef} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-main">{t('shoppingListTitle')}</h3>
          <button onClick={() => printSection(t('shoppingListTitle'), shoppingPrintRef)} className="rounded-lg border px-3 py-2 text-sm" type="button">
            {getExportActionLabel()}
          </button>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-secondary dark:bg-gray-800">
              <tr>
                <th className="px-3 py-2 text-left">{t('shoppingItem')}</th>
                <th className="px-3 py-2 text-right">{t('shoppingQuantity')}</th>
                <th className="px-3 py-2 text-left">{t('shoppingUnit')}</th>
                <th className="px-3 py-2 text-left">{t('shoppingDescription')}</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.label} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-2">{entry.label}</td>
                  <td className="px-3 py-2 text-right font-semibold">{entry.value}</td>
                  <td className="px-3 py-2">{entry.unit}</td>
                  <td className="px-3 py-2">{entry.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('my-route')}
          className={`rounded-full px-3 py-1 text-sm ${activeTab === 'my-route' ? 'bg-primary text-white' : 'bg-secondary text-text-main'}`}
          type="button"
        >
          {t('supplyMyRoute')}
        </button>
        <button
          onClick={() => setActiveTab('global-summary')}
          className={`rounded-full px-3 py-1 text-sm ${activeTab === 'global-summary' ? 'bg-primary text-white' : 'bg-secondary text-text-main'}`}
          type="button"
        >
          {t('supplyGlobalSummary')}
        </button>
        <button
          onClick={() => setActiveTab('shopping-list')}
          className={`rounded-full px-3 py-1 text-sm ${activeTab === 'shopping-list' ? 'bg-primary text-white' : 'bg-secondary text-text-main'}`}
          type="button"
        >
          {t('shoppingListTitle')}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-700">{success}</p>}
      {isLoading && <p className="text-sm text-text-light">{t('loading')}</p>}
      {!isLoading && activeTab === 'my-route' && renderMyRoute()}
      {!isLoading && activeTab === 'global-summary' && renderSummary()}
      {!isLoading && activeTab === 'shopping-list' && renderShoppingList()}
    </div>
  );
};

export default SuppliesModule;
