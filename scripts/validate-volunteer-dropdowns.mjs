import { chromium, devices } from 'playwright';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000/';

const installModuleMocks = async (page) => {
  await page.route('**/services/contributorAuthService.ts*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/javascript', body: `
      const listeners = new Set(); let user = null;
      window.__volunteerSetUser = (next) => { user = next; listeners.forEach((listener) => listener(user)); };
      export const subscribeAuthUser = (listener) => { listeners.add(listener); setTimeout(() => listener(user), 0); return () => listeners.delete(listener); };
      export const isVolunteerUser = (candidate) => Boolean(candidate?.email?.match(/^ruta-([1-9])@voluntarios\\.bokatas\\.local$/));
      export const logoutAuthenticatedUser = async () => window.__volunteerSetUser(null);
      export const resetContributorPassword = async () => undefined;
      export const signInContributorEmail = async () => undefined;
      export const signInContributorGoogle = async () => undefined;
      export const signUpContributor = async () => undefined;
      export const updateContributorProfile = async () => undefined;
      export const changeContributorPassword = async () => undefined;
      export const changeContributorEmail = async () => undefined;
      export const deleteContributorAccount = async () => undefined;
    ` });
  });
  await page.route('**/services/firebaseClient.ts*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: `
        export const isFirebaseAuthConfigured = true;
        export const auth = {};
        export const db = null;
        export const functions = null;
      `,
    });
  });

  await page.route('**/services/resourceStoreService.ts*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: `
        export const getVolunteerResources = async () => [];
        export const getResourceOverrides = async () => ({});
        export const addVolunteerResource = async () => { throw new Error('not-used-in-dropdown-test'); };
        export const saveResourceEdition = async () => { throw new Error('not-used-in-dropdown-test'); };
      `,
    });
  });

  await page.route('**/services/authService.ts*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: `
        const VOLUNTEER_USER_REGEX = /^ruta-([1-9])$/;
        let currentEmail = null;
        const listeners = new Set();

        const notify = () => {
          for (const callback of listeners) {
            callback(currentEmail);
          }
        };

        const getVolunteerEmail = (username) => {
          const normalized = username.trim().toLowerCase();
          if (!VOLUNTEER_USER_REGEX.test(normalized)) {
            throw new Error('invalid-volunteer-user');
          }
          return normalized + '@voluntarios.bokatas.local';
        };

        export const subscribeVolunteerSession = (callback) => {
          listeners.add(callback);
          window.setTimeout(() => callback(currentEmail), 0);
          return () => listeners.delete(callback);
        };

        export const loginVolunteer = async (username) => {
          const email = getVolunteerEmail(username);
          window.setTimeout(() => {
            currentEmail = email;
            notify(); window.__volunteerSetUser?.({ email: currentEmail });
          }, 100);
        };

        export const logoutVolunteer = async () => {
          currentEmail = null;
          notify(); window.__volunteerSetUser?.(null);
        };

        export const getRouteIdFromEmail = (email) => {
          if (!email) {
            return null;
          }
          const username = email.split('@')[0]?.toLowerCase() || '';
          if (!VOLUNTEER_USER_REGEX.test(username)) {
            return null;
          }
          return username;
        };
      `,
    });
  });
};

const loginVolunteer = async (page) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  await page.getByRole('dialog', { name: 'Menú principal' }).getByRole('button', { name: /Acceso voluntarios|Volunteer access/i }).click();
  await page.locator('input[autocomplete="username"]').fill('ruta-5');
  await page.locator('input[type="password"]').fill('test-password');
  await page.getByRole('button', { name: /Entrar|Enter|Sign in/i }).click();
  await page.waitForFunction(() => document.body.innerText.includes('ruta-5'), { timeout: 5000 });
};

const getModuleSelectorButton = (page) => page.getByRole('button', { name: /Bokatas/i }).first();
const getVolunteerHeading = (page) => page.getByRole('heading', { name: 'Área voluntarios' }).first();

const assertHidden = async (page, text) => {
  const locator = page.getByRole('button', { name: text, exact: true });
  const count = await locator.count();
  for (let index = 0; index < count; index += 1) {
    if (await locator.nth(index).isVisible()) {
      throw new Error(`Expected "${text}" to be hidden after outside tap/click`);
    }
  }
};

const validateViewport = async (name, contextOptions) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  try {
    await installModuleMocks(page);
    await loginVolunteer(page);

    await getModuleSelectorButton(page).click();
    await page.getByText('Editar recurso', { exact: true }).waitFor({ timeout: 5000 });
    await getVolunteerHeading(page).click();
    await assertHidden(page, 'Editar recurso');

    await getModuleSelectorButton(page).click();
    await page.getByRole('button', { name: 'Editar recurso' }).click();
    const resourceSelector = page.locator('select.form-control');
    await resourceSelector.selectOption({ index: 1 });
    await page.getByRole('button', { name: 'Guardar cambios' }).waitFor({ timeout: 5000 });

    console.log(`[ok] ${name}: volunteer dropdowns close on outside interaction and still allow module/category changes`);
  } finally {
    await browser.close();
  }
};

await validateViewport('desktop', {
  viewport: { width: 1280, height: 900 },
});

await validateViewport('mobile', {
  ...devices['iPhone 13'],
});
