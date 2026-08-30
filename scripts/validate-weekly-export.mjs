import { chromium, devices } from 'playwright';

const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:4174/';

const validate = async (name, options) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(options);
  const page = await context.newPage();
  try {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    const result = await page.evaluate(async () => {
      const { createWeeklyExportSvg, exportDocumentToPng, shareOrDownloadExport } = await import('/services/weeklyExport.ts');
      const routes = Array.from({ length: 9 }, (_, index) => `Ruta ${index + 1}`);
      const summary = {
        kind: 'summary', weekKey: '2026-W36', routes,
        rows: [
          { label: 'Tortilla', values: [5, 6, 7, 8, 9, 10, 11, 12, 13], total: 81 },
          { label: 'Pavo', values: [4, 4, 4, 4, 4, 4, 4, 4, 4], total: 36 },
        ], sandwichTotals: [9, 10, 11, 12, 13, 14, 15, 16, 17], totalSandwiches: 117,
      };
      const shopping = {
        kind: 'shopping-list', weekKey: '2026-W36',
        entries: [{ label: 'Pan', value: 42, unit: 'barras' }, { label: 'Tortillas', value: 14, unit: 'unidades' }],
        confirmedRoutes: 7, totalRoutes: 9, pendingRoutes: ['Ruta 4', 'Ruta 7'],
      };
      const summarySvg = createWeeklyExportSvg(summary);
      const shoppingSvg = createWeeklyExportSvg(shopping);
      const summaryPng = await exportDocumentToPng(summary);
      const shoppingPng = await exportDocumentToPng(shopping);
      const dimensions = async (blob) => { const bytes = new Uint8Array(await blob.slice(0, 24).arrayBuffer()); return { signature: Array.from(bytes.slice(0, 8)).join(','), width: new DataView(bytes.buffer).getUint32(16), height: new DataView(bytes.buffer).getUint32(20), size: blob.size }; };
      let sharedFile = null;
      Object.defineProperty(navigator, 'canShare', { configurable: true, value: () => true });
      Object.defineProperty(navigator, 'share', { configurable: true, value: async (data) => { sharedFile = data.files?.[0] || null; } });
      const shareResult = await shareOrDownloadExport(summary);
      let downloaded = '';
      Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
      const originalClick = HTMLAnchorElement.prototype.click;
      HTMLAnchorElement.prototype.click = function click() { downloaded = this.download; };
      const downloadResult = await shareOrDownloadExport(shopping);
      HTMLAnchorElement.prototype.click = originalClick;
      return {
        summarySvg, shoppingSvg, summaryDimensions: await dimensions(summaryPng), shoppingDimensions: await dimensions(shoppingPng),
        shareResult, shareFile: sharedFile ? { name: sharedFile.name, type: sharedFile.type, size: sharedFile.size } : null,
        downloadResult, downloaded,
      };
    });
    const pngSignature = '137,80,78,71,13,10,26,10';
    if (!result.summarySvg.includes('Resumen semanal') || !result.summarySvg.includes('Semana 2026-W36') || !result.summarySvg.includes('Ruta 9') || !result.summarySvg.includes('TOTAL BOCADILLOS') || result.summarySvg.includes('<button') || result.summarySvg.includes('Navegación')) throw new Error(`${name}: summary document content is incomplete or contains UI.`);
    if (!result.shoppingSvg.includes('Lista de la compra') || !result.shoppingSvg.includes('Pan') || !result.shoppingSvg.includes('7/9 rutas confirmadas') || !result.shoppingSvg.includes('Pendientes: Ruta 4, Ruta 7') || result.shoppingSvg.includes('<button')) throw new Error(`${name}: shopping document content is incomplete or contains UI.`);
    for (const image of [result.summaryDimensions, result.shoppingDimensions]) if (image.signature !== pngSignature || image.width < 1000 || image.height < 600 || image.size < 1000) throw new Error(`${name}: invalid PNG generated: ${JSON.stringify(image)}`);
    if (result.shareResult !== 'shared' || result.shareFile?.type !== 'image/png' || result.shareFile.size < 1000 || result.downloadResult !== 'downloaded' || !result.downloaded.endsWith('.png')) throw new Error(`${name}: share/download export path failed.`);
    console.log(`[ok] ${name}: clean summary and shopping PNGs contain operational data; Share API and download fallback receive PNG files.`);
  } finally { await browser.close(); }
};

await validate('desktop', { viewport: { width: 1280, height: 900 } });
await validate('mobile', { ...devices['iPhone 13'] });
