import { chromium, devices } from 'playwright';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000/';

const installGoogleMapsStub = async (page) => {
  await page.addInitScript(() => {
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
      constructor() {}
      open() {}
      close() {}
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

    window.google = {
      maps: {
        Map: MockMap,
        Marker: MockMarker,
        InfoWindow: MockInfoWindow,
        LatLngBounds: MockLatLngBounds,
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

const installLoaderMock = async (page) => {
  await page.route('**/services/googleMapsLoader.ts*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: 'export const loadGoogleMapsScript = () => Promise.resolve();',
    });
  });
};

const openFirstSteps = async (page) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.getByText('Primeros Pasos', { exact: true }).first().click();
  await page.waitForFunction(() => document.body.innerText.includes('CAST'), { timeout: 5000 });
};

const validateViewport = async (name, contextOptions) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  try {
    await installGoogleMapsStub(page);
    await installLoaderMock(page);
    await openFirstSteps(page);

    await page.waitForSelector('[data-testid="mock-map"]', { timeout: 5000 });
    await page.waitForSelector('[data-testid="mock-marker"]', { timeout: 5000 });

    const showMapButtons = await page.getByRole('button', { name: /Mostrar mapa|Show map|Ocultar mapa|Hide map/i }).count();
    if (showMapButtons !== 0) {
      throw new Error(`${name}: map toggle button should not be rendered anymore`);
    }

    console.log(`[ok] ${name}: map stays visible by default in resource lists`);
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
