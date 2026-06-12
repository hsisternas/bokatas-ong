import { chromium, devices } from 'playwright';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000/';
const USERNAME = process.env.TEST_VOLUNTEER_USERNAME;
const PASSWORD = process.env.TEST_VOLUNTEER_PASSWORD;

if (!USERNAME || !PASSWORD) {
  console.error('Missing TEST_VOLUNTEER_USERNAME or TEST_VOLUNTEER_PASSWORD.');
  process.exit(1);
}

const waitForSuccessMessage = async (page) => {
  await page.waitForFunction(
    () => document.body.innerText.includes('Semana guardada correctamente.') || document.body.innerText.includes('Week saved successfully.'),
    { timeout: 10000 }
  );
};

const saveAndRevertSupplies = async (page) => {
  await page.getByRole('button', { name: /Mi ruta|My route/i }).click();
  const plusButton = page.locator('button').filter({ hasText: /^\+(\d+(\.\d+)?)?$/ }).first();
  const minusButton = page.locator('button').filter({ hasText: /^-(\d+(\.\d+)?)?$/ }).first();

  await plusButton.click();
  await page.getByRole('button', { name: /Guardar semana|Save week/i }).click();
  await waitForSuccessMessage(page);

  await minusButton.click();
  await page.getByRole('button', { name: /Guardar semana|Save week/i }).click();
  await waitForSuccessMessage(page);
};

const openEditResourceModule = async (page) => {
  await page.getByRole('button', { name: /Bokatas/i }).first().click();
  await page.getByRole('button', { name: /Editar recurso|Edit resource/i }).first().click();
};

const validateViewport = async (name, contextOptions) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  try {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: /Acceso voluntarios|Volunteer access/i }).click();
    await page.locator('input[autocomplete="username"]').fill(USERNAME);
    await page.locator('input[type="password"]').fill(PASSWORD);
    await page.getByRole('button', { name: /Entrar|Enter|Sign in/i }).click();

    await page.waitForFunction(
      (username) => document.body.innerText.toLowerCase().includes(username.toLowerCase()),
      USERNAME,
      { timeout: 15000 }
    );

    await saveAndRevertSupplies(page);

    await openEditResourceModule(page);
    await page.waitForFunction(() => document.body.innerText.includes('Primeros Pasos') || document.body.innerText.includes('First Steps'), { timeout: 10000 });

    console.log(`[ok] ${name}: real volunteer login worked, supplies saved/reverted, edit-resource module loaded`);
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
