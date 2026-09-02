import type { SupplyField, SupplyValues } from './supplyCalculations';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

export interface ExportRow {
  label: string;
  values: number[];
  total: number;
}

export interface WeeklySummaryExport {
  kind: 'summary';
  weekKey: string;
  routes: string[];
  rows: ExportRow[];
  sandwichTotals: number[];
  totalSandwiches: number;
}

export interface ShoppingExportEntry {
  label: string;
  value: number;
  unit: string;
}

export interface ShoppingListExport {
  kind: 'shopping-list';
  weekKey: string;
  entries: ShoppingExportEntry[];
  confirmedRoutes: number;
  totalRoutes: number;
  pendingRoutes: string[];
}

export type WeeklyExportDocument = WeeklySummaryExport | ShoppingListExport;

const escapeXml = (value: string): string => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&apos;', '"': '&quot;' }[character] || character));
const formatNumber = (value: number): string => value.toFixed(1).replace('.0', '');
const line = (x1: number, y1: number, x2: number, y2: number, color = '#d8e3eb') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2"/>`;
const text = (x: number, y: number, value: string, options: { size?: number; weight?: number; anchor?: 'start' | 'middle' | 'end'; color?: string } = {}) => `<text x="${x}" y="${y}" fill="${options.color || '#17324a'}" font-family="Arial, Helvetica, sans-serif" font-size="${options.size || 28}" font-weight="${options.weight || 400}" text-anchor="${options.anchor || 'start'}">${escapeXml(value)}</text>`;

const svgFrame = (width: number, height: number, content: string): string => `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <rect width="100%" height="20" fill="#2aa7df"/>
  ${content}
</svg>`;

export const createWeeklyExportSvg = (document: WeeklyExportDocument): string => {
  if (document.kind === 'summary') {
    const width = 2240;
    const startX = 100;
    const tableTop = 260;
    const labelWidth = 390;
    const columnWidth = 165;
    const totalWidth = 180;
    const rowHeight = 76;
    const contentWidth = labelWidth + (document.routes.length * columnWidth) + totalWidth;
    const totalX = startX + labelWidth + (document.routes.length * columnWidth);
    const header = [
      text(startX, 96, 'BOKATAS', { size: 38, weight: 800, color: '#176c9b' }),
      text(startX, 153, 'Resumen semanal', { size: 48, weight: 800 }),
      text(startX, 202, `Semana ${document.weekKey}`, { size: 28, color: '#587082' }),
      `<rect x="${startX}" y="${tableTop}" width="${contentWidth}" height="64" rx="10" fill="#e6f4fb"/>`,
      text(startX + 20, tableTop + 42, 'Producto', { size: 24, weight: 700 }),
      ...document.routes.map((route, index) => text(startX + labelWidth + (index * columnWidth) + (columnWidth / 2), tableTop + 42, route, { size: 20, weight: 700, anchor: 'middle' })),
      text(totalX + (totalWidth / 2), tableTop + 42, 'TOTAL', { size: 22, weight: 800, anchor: 'middle', color: '#176c9b' }),
    ];
    const body = document.rows.flatMap((row, rowIndex) => {
      const y = tableTop + 64 + (rowIndex * rowHeight);
      return [
        rowIndex % 2 === 0 ? `<rect x="${startX}" y="${y}" width="${contentWidth}" height="${rowHeight}" fill="#f8fbfd"/>` : '',
        line(startX, y + rowHeight, startX + contentWidth, y + rowHeight),
        text(startX + 20, y + 48, row.label, { size: 24, weight: 600 }),
        ...row.values.map((value, index) => text(startX + labelWidth + (index * columnWidth) + (columnWidth / 2), y + 48, formatNumber(value), { size: 24, anchor: 'middle' })),
        text(totalX + (totalWidth / 2), y + 48, formatNumber(row.total), { size: 26, weight: 800, anchor: 'middle', color: '#176c9b' }),
      ];
    });
    const finalY = tableTop + 64 + (document.rows.length * rowHeight);
    const footer = [
      `<rect x="${startX}" y="${finalY}" width="${contentWidth}" height="${rowHeight}" fill="#dff3fc"/>`,
      text(startX + 20, finalY + 48, 'TOTAL BOCADILLOS', { size: 24, weight: 800 }),
      ...document.sandwichTotals.map((value, index) => text(startX + labelWidth + (index * columnWidth) + (columnWidth / 2), finalY + 48, formatNumber(value), { size: 24, weight: 800, anchor: 'middle' })),
      text(totalX + (totalWidth / 2), finalY + 48, formatNumber(document.totalSandwiches), { size: 28, weight: 800, anchor: 'middle', color: '#176c9b' }),
      text(startX, finalY + 132, 'Documento generado por Bokatas', { size: 20, color: '#718596' }),
    ];
    return svgFrame(width, finalY + 180, [...header, ...body, ...footer].join(''));
  }

  const width = 1320;
  const startX = 92;
  const tableTop = 255;
  const contentWidth = 1136;
  const rowHeight = 74;
  const rows = document.entries.map((entry, index) => {
    const y = tableTop + 62 + (index * rowHeight);
    return [
      index % 2 === 0 ? `<rect x="${startX}" y="${y}" width="${contentWidth}" height="${rowHeight}" fill="#f8fbfd"/>` : '',
      line(startX, y + rowHeight, startX + contentWidth, y + rowHeight),
      text(startX + 22, y + 47, entry.label, { size: 27, weight: 600 }),
      text(startX + 820, y + 47, formatNumber(entry.value), { size: 30, weight: 800, anchor: 'end', color: '#176c9b' }),
      text(startX + 850, y + 47, entry.unit, { size: 24, color: '#587082' }),
    ];
  });
  const statusY = tableTop + 62 + (document.entries.length * rowHeight) + 52;
  const pending = document.pendingRoutes.length ? `Pendientes: ${document.pendingRoutes.join(', ')}` : 'Todo listo para preparar la compra';
  return svgFrame(width, statusY + 185, [
    text(startX, 96, 'BOKATAS', { size: 38, weight: 800, color: '#176c9b' }),
    text(startX, 153, 'Lista de la compra', { size: 48, weight: 800 }),
    text(startX, 202, `Semana ${document.weekKey}`, { size: 28, color: '#587082' }),
    `<rect x="${startX}" y="${tableTop}" width="${contentWidth}" height="62" rx="10" fill="#e6f4fb"/>`,
    text(startX + 22, tableTop + 40, 'Producto', { size: 24, weight: 700 }),
    text(startX + 820, tableTop + 40, 'Cantidad', { size: 24, weight: 700, anchor: 'end' }),
    text(startX + 850, tableTop + 40, 'Unidad', { size: 24, weight: 700 }),
    ...rows.flat(),
    `<rect x="${startX}" y="${statusY}" width="${contentWidth}" height="94" rx="12" fill="#f0f9ff" stroke="#bae6fd" stroke-width="2"/>`,
    text(startX + 22, statusY + 38, `${document.confirmedRoutes}/${document.totalRoutes} rutas confirmadas`, { size: 25, weight: 800, color: '#176c9b' }),
    text(startX + 22, statusY + 73, pending, { size: 22, color: '#587082' }),
    text(startX, statusY + 145, 'Documento generado por Bokatas', { size: 20, color: '#718596' }),
  ].join(''));
};

export const exportDocumentToPng = async (exportData: WeeklyExportDocument): Promise<Blob> => {
  const svg = createWeeklyExportSvg(exportData);
  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error('No se ha podido crear el documento.')); image.src = url; });
    const canvas = window.document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Tu navegador no permite exportar imágenes.');
    context.drawImage(image, 0, 0);
    return await new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('No se ha podido crear el PNG.')), 'image/png'));
  } finally { URL.revokeObjectURL(url); }
};

const blobToBase64 = async (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = () => reject(new Error('No se ha podido preparar el archivo para compartir.'));
  reader.onload = () => {
    const value = typeof reader.result === 'string' ? reader.result : '';
    const separator = value.indexOf(',');
    resolve(separator >= 0 ? value.slice(separator + 1) : value);
  };
  reader.readAsDataURL(blob);
});

const exportTitle = (document: WeeklyExportDocument) => document.kind === 'summary'
  ? 'Resumen semanal Bokatas'
  : 'Lista de la compra Bokatas';

const exportFilename = (document: WeeklyExportDocument) => `${document.kind === 'summary' ? 'resumen-semanal' : 'lista-compra'}-${document.weekKey}.png`;

/**
 * Native share sheets only accept local file URIs. The PNG is deliberately
 * written to temporary app storage: it never leaves the device until the user
 * chooses a destination in the system share sheet.
 */
const shareNativePng = async (png: Blob, document: WeeklyExportDocument) => {
  const filename = exportFilename(document);
  const path = `bokatas-exports/${filename}`;
  const base64 = await blobToBase64(png);
  const stored = await Filesystem.writeFile({ path, data: base64, directory: Directory.Temporary, recursive: true });
  try {
    const capability = await Share.canShare();
    if (!capability.value) throw new Error('El dispositivo no permite compartir archivos.');
    await Share.share({ title: exportTitle(document), files: [stored.uri], dialogTitle: 'Compartir documento Bokatas' });
  } finally {
    // The native share operation receives the URI before this promise settles.
    // Cache storage is also ephemeral, so a failed cleanup never retains user data.
    await Filesystem.deleteFile({ path, directory: Directory.Temporary }).catch(() => undefined);
  }
};

export const shareOrDownloadExport = async (exportData: WeeklyExportDocument): Promise<'shared' | 'downloaded'> => {
  const png = await exportDocumentToPng(exportData);
  const filename = exportFilename(exportData);
  if (Capacitor.isNativePlatform()) {
    await shareNativePng(png, exportData);
    return 'shared';
  }
  const file = new File([png], filename, { type: 'image/png' });
  const navigatorWithShare = navigator as Navigator & { canShare?: (data?: ShareData) => boolean };
  if (navigatorWithShare.share && (!navigatorWithShare.canShare || navigatorWithShare.canShare({ files: [file] }))) {
    await navigatorWithShare.share({ files: [file], title: exportTitle(exportData) });
    return 'shared';
  }
  const url = URL.createObjectURL(png);
  const link = window.document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
  return 'downloaded';
};

export const toSummaryRows = (fields: readonly SupplyField[], labels: Record<SupplyField, string>, routeValues: SupplyValues[], totals: SupplyValues): ExportRow[] => fields.map((field) => ({
  label: labels[field], values: routeValues.map((values) => values[field]), total: totals[field],
}));
