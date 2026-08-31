import { chromium, devices } from 'playwright';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000/';

const installMocks = async (page, { volunteer = false } = {}) => {
  await page.addInitScript(({ volunteerUser }) => {
    window.__qaVolunteerUser = volunteerUser;
    window.__geoRequests = 0;
    navigator.geolocation.getCurrentPosition = (success) => {
      window.__geoRequests += 1;
      success({ coords: { latitude: 39.47, longitude: -0.38 } });
    };
    window.google = {
      maps: {
        Map: class { constructor(element) { element.dataset.testid = 'map'; } fitBounds() {} setCenter() {} setZoom() {} addListener() { return { remove() {} }; } },
        Marker: class { constructor() {} addListener() { return { remove() {} }; } setMap() {} getPosition() { return { lat: 0, lng: 0 }; } },
        InfoWindow: class { open() {} close() {} },
        LatLngBounds: class { extend() {} isEmpty() { return false; } getCenter() { return { lat: 39.47, lng: -0.38 }; } },
        SymbolPath: { CIRCLE: 0 },
        places: { Autocomplete: class {} },
      },
    };
  }, { volunteerUser: volunteer });
  await page.route('**/services/firebaseClient.ts*', (route) => route.fulfill({ status: 200, contentType: 'application/javascript', body: 'export const isFirebaseAuthConfigured = true; export const auth = {}; export const db = null; export const functions = null;' }));
  await page.route('**/services/googleMapsLoader.ts*', (route) => route.fulfill({ status: 200, contentType: 'application/javascript', body: 'export const loadGoogleMapsScript = () => Promise.resolve();' }));
  await page.route('**/services/contributorAuthService.ts*', (route) => route.fulfill({ status: 200, contentType: 'application/javascript', body: `
    const user = window.__qaVolunteerUser ? {uid:'volunteer', email:'ruta1@voluntarios.bokatas.local', providerData:[]} : null;
    export const subscribeAuthUser = (listener) => { setTimeout(() => listener(user), 0); return () => {}; };
    export const isVolunteerUser = (candidate) => Boolean(candidate?.email?.includes('@voluntarios.bokatas.local'));
    export const signInContributorEmail = async () => undefined;
    export const signUpContributor = async () => undefined;
    export const signInContributorGoogle = async () => undefined;
    export const resetContributorPassword = async () => undefined;
    export const logoutAuthenticatedUser = async () => undefined;
    export const updateContributorProfile = async () => undefined;
    export const changeContributorPassword = async () => undefined;
    export const changeContributorEmail = async () => undefined;
  ` }));
};

const verifyPublicNavigation = async (name, contextOptions) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  try {
    await installMocks(page);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    if (await page.getByRole('button', { name: 'Mi cuenta' }).count()) throw new Error(`${name}: account must not be a persistent public-header action`);
    if (await page.evaluate(() => window.__geoRequests) !== 0) throw new Error(`${name}: geolocation was requested on app start`);
    await page.locator('button[aria-label="Abrir menú"]').click();
    const dialog = page.getByRole('dialog', { name: 'Menú principal' });
    const contributionCallout = dialog.getByRole('complementary', { name: 'Aporta un recurso' });
    await contributionCallout.getByRole('button', { name: /Añádelo a Bokatas/i }).waitFor();
    if (await dialog.getByRole('button', { name: 'Mi cuenta' }).count()) throw new Error(`${name}: public menu must not show a redundant account action`);
    if (await dialog.getByRole('button', { name: /Añádelo a Bokatas/i }).count() !== 1) throw new Error(`${name}: public menu must have exactly one contribution CTA`);
    for (const label of ['Acceso voluntarios', 'Hazte voluntario']) {
      if (!(await dialog.getByRole('button', { name: label }).count())) throw new Error(`${name}: menu is missing ${label}`);
    }
    const overflow = await page.evaluate(() => document.body.style.overflow);
    if (overflow !== 'hidden') throw new Error(`${name}: menu did not lock background scroll`);
    if (await page.evaluate(() => document.activeElement?.getAttribute('aria-label')) !== 'Cerrar menú') throw new Error(`${name}: menu did not move focus to its close control`);
    await page.keyboard.press('Shift+Tab');
    if (!(await page.evaluate(() => document.activeElement?.textContent?.includes('Hazte voluntario')))) throw new Error(`${name}: menu does not trap reverse keyboard focus`);
    await page.keyboard.press('Tab');
    if (await page.evaluate(() => document.activeElement?.getAttribute('aria-label')) !== 'Cerrar menú') throw new Error(`${name}: menu does not trap forward keyboard focus`);
    await page.keyboard.press('Escape');
    if (await page.getByRole('dialog', { name: 'Menú principal' }).count()) throw new Error(`${name}: Escape did not close the menu`);
    await page.locator('button[aria-label="Abrir menú"]').click();
    await dialog.getByRole('button', { name: 'Hazte voluntario' }).click();
    await page.locator('h2', { hasText: 'Hazte voluntario' }).waitFor();
    if (!page.url().endsWith('/hazte-voluntario')) throw new Error(`${name}: volunteer page does not have a stable public URL`);
    await page.getByLabel(/Nombre y apellidos/).fill('Prueba Bokatas');
    await page.getByLabel(/Correo electrónico/).fill('prueba@example.org');
    await page.getByLabel(/^Teléfono/).fill('600000000');
    await page.getByLabel(/Sede en la que/).fill('Valencia');
    await page.getByLabel(/Zona que prefieres/).fill('Centro');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Enviar solicitud' }).click();
    await page.getByRole('status').getByText(/todavía no se ha enviado/i).waitFor();
    await page.getByLabel('Volver').click();
    await page.getByText('Primeros Pasos', { exact: true }).first().click();
    if (await page.evaluate(() => window.__geoRequests) !== 0) throw new Error(`${name}: geolocation was requested on entering a category`);
    const order = await page.evaluate(() => [document.querySelector('.location-callout'), document.querySelector('[data-testid="map"]'), document.querySelector('.resource-contribute-callout')].map((element) => element?.getBoundingClientRect().top));
    if (!(order[0] < order[1] && order[1] < order[2])) throw new Error(`${name}: category order must be location, map, contribution CTA, list`);
    await page.getByRole('button', { name: 'Ver cerca de mí' }).click();
    if (await page.evaluate(() => window.__geoRequests) !== 1) throw new Error(`${name}: geolocation was not requested by the explicit action`);
    console.log(`[ok] ${name}: public menu, volunteer route and contextual geolocation.`);
  } finally { await browser.close(); }
};

const verifyVolunteerNavigation = async (contextOptions) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  try {
    await installMocks(page, { volunteer: true });
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.locator('button[aria-label="Abrir menú"]').click();
    const dialog = page.getByRole('dialog', { name: 'Menú principal' });
    await dialog.getByRole('button', { name: 'Área de voluntariado' }).waitFor();
    if (await dialog.getByRole('button', { name: 'Mi cuenta' }).count()) throw new Error('volunteer: contributor account must not be mixed into volunteer navigation');
    console.log('[ok] volunteer: internal area stays contextual in the menu.');
  } finally { await browser.close(); }
};

await verifyPublicNavigation('desktop', { viewport: { width: 1280, height: 900 } });
await verifyPublicNavigation('iPhone 13', { ...devices['iPhone 13'] });
await verifyVolunteerNavigation({ ...devices['iPhone 13'] });
