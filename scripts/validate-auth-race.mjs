import { chromium, devices } from 'playwright';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000/';
const TARGET_USERNAME = 'ruta-5';
const TARGET_EMAIL = `${TARGET_USERNAME}@voluntarios.bokatas.local`;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const installModuleMocks = async (page) => {
  await page.route('**/services/contributorAuthService.ts*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/javascript', body: `
      const listeners = new Set(); let user = null;
      window.__authRaceSetUser = (next) => { user = next; listeners.forEach((listener) => listener(user)); };
      export const subscribeAuthUser = (listener) => { listeners.add(listener); setTimeout(() => listener(user), 0); return () => listeners.delete(listener); };
      export const isVolunteerUser = (candidate) => Boolean(candidate?.email?.match(/^ruta-([1-9])@voluntarios\\.bokatas\\.local$/));
      export const logoutAuthenticatedUser = async () => window.__authRaceSetUser(null);
      export const resetContributorPassword = async () => undefined;
      export const signInContributorEmail = async () => undefined;
      export const signInContributorGoogle = async () => undefined;
      export const signUpContributor = async () => undefined;
      export const updateContributorProfile = async () => undefined;
      export const changeContributorPassword = async () => undefined;
      export const changeContributorEmail = async () => undefined;
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
        export const addVolunteerResource = async () => { throw new Error('not-used-in-auth-test'); };
        export const saveResourceEdition = async () => { throw new Error('not-used-in-auth-test'); };
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
            notify(); window.__authRaceSetUser?.({ email: currentEmail });
          }, 250);
        };

        export const logoutVolunteer = async () => {
          currentEmail = null;
          notify(); window.__authRaceSetUser?.(null);
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

const installTextSampler = async (page) => {
  await page.evaluate(() => {
    window.__authRaceSamples = [];
    window.__authRaceStop = false;

    const sample = () => {
      window.__authRaceSamples.push(document.body.innerText);
      if (!window.__authRaceStop) {
        window.requestAnimationFrame(sample);
      }
    };

    window.requestAnimationFrame(sample);
  });
};

const stopTextSampler = async (page) => {
  return page.evaluate(() => {
    window.__authRaceStop = true;
    return window.__authRaceSamples;
  });
};

const validateViewport = async (name, pageOptions) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(pageOptions);
  const page = await context.newPage();
  const pageErrors = [];
  const moduleRequests = [];

  page.on('pageerror', (error) => {
    pageErrors.push(`pageerror: ${error.message}`);
  });
  page.on('console', (message) => {
    if (message.type() === 'error') {
      pageErrors.push(`console:${message.text()}`);
    }
  });
  page.on('request', (request) => {
    const url = request.url();
    if (url.includes('authService') || url.includes('firebaseClient') || url.includes('resourceStoreService')) {
      moduleRequests.push(url);
    }
  });

  try {
    await installModuleMocks(page);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    const accessButton = page.getByRole('button', { name: /Acceso voluntariado|Volunteer Access|volunt/i });
    const accessButtonCount = await accessButton.count();
    if (accessButtonCount === 0) {
      const bodyText = await page.locator('body').innerText();
      throw new Error(`${name}: volunteer access button not found\n${pageErrors.join('\n')}\n--- body ---\n${bodyText}`);
    }

    await page.waitForFunction(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.some((button) => /volunt/i.test(button.innerText) && !button.hasAttribute('disabled'));
    }, { timeout: 15000 });

    await accessButton.first().click();
    await page.waitForTimeout(300);

    const usernameInput = page.locator('input[autocomplete="username"]');
    const passwordInput = page.locator('input[type="password"]');
    const usernameCount = await usernameInput.count();
    const passwordCount = await passwordInput.count();
    if (usernameCount === 0 || passwordCount === 0) {
      const bodyText = await page.locator('body').innerText();
      throw new Error(`${name}: login modal did not render expected inputs\n${pageErrors.join('\n')}\n--- body ---\n${bodyText}`);
    }

    await usernameInput.first().fill(TARGET_USERNAME);
    await passwordInput.first().fill('test-password');

    await installTextSampler(page);
    await page.getByRole('button', { name: /Entrar|Sign in|Iniciar sesión/i }).click();

    try {
      await page.waitForFunction(
        (expectedEmail) => document.body.innerText.includes(expectedEmail),
        TARGET_USERNAME,
        { timeout: 5000 }
      );
    } catch (error) {
      const bodyText = await page.locator('body').innerText();
      throw new Error(`${name}: authenticated route never appeared\n${pageErrors.join('\n')}\n--- module requests ---\n${moduleRequests.join('\n')}\n--- body ---\n${bodyText}\n--- cause ---\n${error}`);
    }
    await wait(300);

    const samples = await stopTextSampler(page);
    const sawWrongRoute = samples.some((text) => text.includes('ruta-1') || text.includes('Ruta 1'));
    const finalText = await page.locator('body').innerText();
    const sawTargetRoute = finalText.includes(TARGET_USERNAME) || finalText.includes('Ruta 5');

    if (!sawTargetRoute) {
      throw new Error(`${name}: volunteer area never showed the authenticated route`);
    }

    if (sawWrongRoute) {
      throw new Error(`${name}: volunteer area rendered ruta-1 during login flow`);
    }

    await page.getByRole('button', { name: /Cerrar sesión|Logout/i }).click();
    await page.waitForFunction(
      (expectedEmail) => {
        const text = document.body.innerText;
        return (text.includes('Voluntariado') || text.includes('Volunteer access')) && !text.includes(expectedEmail);
      },
      TARGET_USERNAME,
      { timeout: 5000 }
    );

    console.log(`[ok] ${name}: route stayed on ruta-5 and logout returned to public view`);
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
