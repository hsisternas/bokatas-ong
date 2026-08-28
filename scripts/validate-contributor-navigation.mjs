import { chromium, devices } from 'playwright';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000/';

const installMocks = async (page) => {
  await page.route('**/services/firebaseClient.ts*', (route) => route.fulfill({ status: 200, contentType: 'application/javascript', body: 'export const isFirebaseAuthConfigured = true; export const auth = {}; export const db = null; export const functions = null;' }));
  await page.route('**/services/contributorAuthService.ts*', (route) => route.fulfill({ status: 200, contentType: 'application/javascript', body: `
    let user = null; const listeners = new Set(); const setUser = (next) => { user = next; listeners.forEach((listener) => listener(user)); };
    export const subscribeAuthUser = (listener) => { listeners.add(listener); setTimeout(() => listener(user), 0); return () => listeners.delete(listener); };
    export const isVolunteerUser = (candidate) => Boolean(candidate?.email?.includes('@voluntarios.bokatas.local'));
    export const signInContributorEmail = async () => setUser({uid:'qa', email:'qa@example.org', displayName:'QA', providerData:[]});
    export const signUpContributor = async () => setUser({uid:'qa', email:'qa@example.org', displayName:'QA', providerData:[]});
    export const signInContributorGoogle = async () => setUser({uid:'qa', email:'qa@example.org', displayName:'QA', providerData:[]});
    export const resetContributorPassword = async () => undefined; export const logoutAuthenticatedUser = async () => setUser(null);
    export const updateContributorProfile = async () => undefined; export const changeContributorPassword = async () => undefined; export const changeContributorEmail = async () => undefined;
  ` }));
};

const verify = async (name, contextOptions) => {
  const browser = await chromium.launch({ headless: true }); const context = await browser.newContext(contextOptions); const page = await context.newPage();
  try {
    await installMocks(page); await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Añade un recurso' }).last().click();
    await page.getByRole('button', { name: /Crear cuenta/i }).click();
    await page.getByLabel('Tu nombre').fill('QA'); await page.locator('input[type="email"]').fill('qa@example.org'); await page.locator('input[type="password"]').fill('temporary-password');
    await page.getByRole('button', { name: 'Crear cuenta' }).first().click();
    try { await page.getByRole('heading', { name: 'Añade un recurso' }).waitFor({ timeout: 5000 }); } catch (error) { throw new Error(`${name}: add intent did not navigate\n${await page.locator('body').innerText()}\n${error}`); }
    await page.getByRole('button', { name: /Mis recursos/i }).first().click();
    await page.getByRole('heading', { name: 'Mis recursos' }).last().waitFor({ timeout: 5000 });
    console.log(`[ok] ${name}: signup preserves the add-resource intent and account navigation is visible.`);
  } finally { await browser.close(); }
};

const verifyDirectLogin = async (name, contextOptions) => {
  const browser = await chromium.launch({ headless: true }); const context = await browser.newContext(contextOptions); const page = await context.newPage();
  try {
    await installMocks(page); await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Mi cuenta' }).first().click();
    await page.locator('input[type="email"]').fill('qa@example.org'); await page.locator('input[type="password"]').fill('temporary-password');
    await page.getByRole('button', { name: 'Entrar' }).click();
    await page.getByRole('heading', { name: 'Mis recursos' }).last().waitFor({ timeout: 5000 });
    console.log(`[ok] ${name}: direct login enters Mis recursos.`);
  } finally { await browser.close(); }
};

const verifyGoogleIntent = async (name, contextOptions) => {
  const browser = await chromium.launch({ headless: true }); const context = await browser.newContext(contextOptions); const page = await context.newPage();
  try {
    await installMocks(page); await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Añade un recurso' }).last().click();
    await page.getByRole('button', { name: /Continuar con Google/i }).click();
    await page.getByRole('heading', { name: 'Añade un recurso' }).waitFor({ timeout: 5000 });
    console.log(`[ok] ${name}: Google callback preserves the add-resource intent.`);
  } finally { await browser.close(); }
};

const verifyDarkChrome = async (name, contextOptions) => {
  const browser = await chromium.launch({ headless: true }); const context = await browser.newContext(contextOptions); const page = await context.newPage();
  try {
    await installMocks(page); await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.getByLabel('Activar modo noche').click();
    const result = await page.evaluate(() => ({ dark: document.documentElement.classList.contains('dark'), header: getComputedStyle(document.querySelector('header')).backgroundImage, footer: getComputedStyle(document.querySelector('footer')).backgroundColor }));
    if (!result.dark || result.header === 'none' || result.footer === 'rgb(248, 250, 252)') throw new Error(`${name}: dark header/footer styles were not applied.`);
    console.log(`[ok] ${name}: dark header and footer apply their dedicated theme.`);
  } finally { await browser.close(); }
};

await verify('desktop', { viewport: { width: 1280, height: 900 } });
await verify('mobile', { ...devices['iPhone 13'] });
await verifyDirectLogin('desktop', { viewport: { width: 1280, height: 900 } });
await verifyDirectLogin('mobile', { ...devices['iPhone 13'] });
await verifyGoogleIntent('desktop', { viewport: { width: 1280, height: 900 } });
await verifyGoogleIntent('mobile', { ...devices['iPhone 13'] });
await verifyDarkChrome('desktop', { viewport: { width: 1280, height: 900 } });
await verifyDarkChrome('mobile', { ...devices['iPhone 13'] });
