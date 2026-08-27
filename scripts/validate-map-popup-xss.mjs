import { chromium, devices } from 'playwright';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000/';
const RESOURCE_NAME = 'Centro Seguro';
const MALICIOUS_ADDRESS = 'C/ Prueba <img src=x onerror="window.__xssInjected = 1">';

const installGoogleMapsStub = async (page) => {
  await page.addInitScript(() => {
    window.__xssInjected = 0;

    class MockMap {
      constructor(element) {
        this.element = element;
        this.element.dataset.testid = 'mock-map';
      }

      fitBounds() {}
      setCenter() {}
      setZoom() {}
      addListener() {
        return { remove() {} };
      }
    }

    class MockMarker {
      constructor(options = {}) {
        this.options = options;
        this.map = options.map || null;
        this.listeners = {};
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.dataset.testid = 'mock-marker';
        this.button.textContent = options.title || 'marker';
        this.button.addEventListener('click', () => {
          this.listeners.click?.();
        });

        if (this.map?.element) {
          this.map.element.appendChild(this.button);
        }
      }

      addListener(eventName, handler) {
        this.listeners[eventName] = handler;
        return { remove() {} };
      }

      getPosition() {
        return this.options.position || { lat: 0, lng: 0 };
      }

      setMap(map) {
        this.map = map;
        if (map === null && this.button.isConnected) {
          this.button.remove();
        }
      }
    }

    class MockInfoWindow {
      constructor(options = {}) {
        this.content = options.content;
        this.container = null;
      }

      open(map) {
        this.close();
        this.container = document.createElement('div');
        this.container.dataset.testid = 'mock-infowindow';

        if (typeof this.content === 'string') {
          this.container.innerHTML = this.content;
        } else if (this.content) {
          this.container.appendChild(this.content);
        }

        map.element.appendChild(this.container);
      }

      close() {
        if (this.container?.isConnected) {
          this.container.remove();
        }
      }

      addListener() {
        return { remove() {} };
      }
    }

    class MockLatLngBounds {
      extend() {}
      getCenter() {
        return { lat: 39.4699, lng: -0.3763 };
      }
      isEmpty() {
        return false;
      }
    }

    class MockGeocoder {
      geocode(_request, callback) {
        callback([], 'ZERO_RESULTS');
      }
    }

    window.google = {
      maps: {
        Map: MockMap,
        Marker: MockMarker,
        InfoWindow: MockInfoWindow,
        LatLngBounds: MockLatLngBounds,
        Geocoder: MockGeocoder,
        SymbolPath: {
          CIRCLE: 0,
        },
        places: {
          Autocomplete: class {},
        },
      },
    };
  });
};

const installModuleMocks = async (page) => {
  await page.route('**/services/resourceService.ts*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/javascript', body: `
      export const getCategories = () => [{ id: 'primeros-pasos', name: { es: 'Primeros Pasos', en: 'First Steps', it: 'Primi Passi', ar: 'الخطوات الأولى', fr: 'Premiers Pas' }, description: { es: '', en: '', it: '', ar: '', fr: '' }, icon: () => null }];
      export const getResources = () => [{ id: 'custom-xss-check', categoryId: 'primeros-pasos', name: { es: '${RESOURCE_NAME}', en: '${RESOURCE_NAME}', it: '${RESOURCE_NAME}', ar: '${RESOURCE_NAME}', fr: '${RESOURCE_NAME}' }, description: { es: 'Popup de prueba', en: 'Popup test', it: 'Test popup', ar: 'اختبار النافذة', fr: 'Test popup' }, address: ${JSON.stringify(MALICIOUS_ADDRESS)}, phone: '', email: '', hours: '', coordinates: { lat: 39.47, lng: -0.37 }, updated: '12.06.26' }];
    ` });
  });
  await page.route('**/services/googleMapsLoader.ts*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: 'export const loadGoogleMapsScript = () => Promise.resolve();',
    });
  });

  await page.route('**/services/resourceStoreService.ts*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: `
        export const getVolunteerResources = async () => ([
          {
            id: 'custom-xss-check',
            categoryId: 'primeros-pasos',
            name: { es: '${RESOURCE_NAME}', en: '${RESOURCE_NAME}', it: '${RESOURCE_NAME}', ar: '${RESOURCE_NAME}', fr: '${RESOURCE_NAME}' },
            description: { es: 'Popup de prueba', en: 'Popup test', it: 'Test popup', ar: 'اختبار النافذة', fr: 'Test popup' },
            address: ${JSON.stringify(MALICIOUS_ADDRESS)},
            phone: '',
            email: '',
            hours: '',
            coordinates: { lat: 39.47, lng: -0.37 },
            updated: '12.06.26'
          }
        ]);
        export const getResourceOverrides = async () => ({});
        export const addVolunteerResource = async () => { throw new Error('not-used-in-xss-test'); };
        export const saveResourceEdition = async () => { throw new Error('not-used-in-xss-test'); };
      `,
    });
  });
};

const validateViewport = async (name, contextOptions) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  try {
    await installGoogleMapsStub(page);
    await installModuleMocks(page);

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.getByText('Primeros Pasos', { exact: true }).first().click();

    await page.waitForSelector('[data-testid="mock-marker"]', { timeout: 5000 });
    await page.locator('[data-testid="mock-marker"]').last().click();
    await page.waitForSelector('[data-testid="mock-infowindow"]', { timeout: 5000 });

    const injectedValue = await page.evaluate(() => window.__xssInjected);
    if (injectedValue !== 0) {
      throw new Error(`${name}: popup content executed injected HTML`);
    }

    const popupText = await page.locator('[data-testid="mock-infowindow"]').innerText();
    if (!popupText.includes('<img src=x onerror="window.__xssInjected = 1">')) {
      throw new Error(`${name}: popup did not render the malicious address as plain text`);
    }

    await page.getByRole('button', { name: /Ver detalles|View details/i }).click();
    await page.waitForFunction(
      (resourceName) => document.body.innerText.includes(resourceName),
      RESOURCE_NAME,
      { timeout: 5000 }
    );

    console.log(`[ok] ${name}: popup treated injected HTML as text and kept detail navigation working`);
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
