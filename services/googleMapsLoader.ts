const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const LOAD_TIMEOUT_MS = 10000;

let scriptLoadingPromise: Promise<void> | null = null;

const getScriptSrc = () => {
  const params = new URLSearchParams({
    key: GOOGLE_MAPS_API_KEY,
    libraries: 'places',
    loading: 'async',
  });
  return `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
};

export const loadGoogleMapsScript = (): Promise<void> => {
  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }

  scriptLoadingPromise = new Promise((resolve, reject) => {
    const finishWithError = (error: Error) => {
      scriptLoadingPromise = null;
      reject(error);
    };

    const waitForMapsReady = () => {
      const startedAt = Date.now();

      const poll = () => {
        const maps = window.google?.maps;
        if (typeof maps?.Map === 'function' && typeof maps?.places?.Autocomplete === 'function') {
          resolve();
          return;
        }

        if (Date.now() - startedAt >= LOAD_TIMEOUT_MS) {
          finishWithError(new Error('Google Maps libraries did not become ready in time.'));
          return;
        }

        window.setTimeout(poll, 50);
      };

      poll();
    };

    const ensureLibraries = async () => {
      try {
        const maps = window.google?.maps;
        if (typeof maps?.importLibrary === 'function') {
          await maps.importLibrary('maps');
          await maps.importLibrary('places');
        }
        waitForMapsReady();
      } catch (error) {
        finishWithError(error instanceof Error ? error : new Error('Google Maps libraries failed to load.'));
      }
    };

    if (typeof window.google?.maps?.Map === 'function' && typeof window.google?.maps?.places?.Autocomplete === 'function') {
      resolve();
      return;
    }

    if (window.google?.maps) {
      ensureLibraries();
      return;
    }

    if (!GOOGLE_MAPS_API_KEY) {
      finishWithError(new Error('Google Maps API key is not configured'));
      return;
    }

    const existingScript = document.querySelector('script[data-google-maps="true"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        ensureLibraries();
      }, { once: true });
      existingScript.addEventListener('error', () => finishWithError(new Error('Google Maps script failed to load.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = getScriptSrc();
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = 'true';
    script.onload = () => {
      ensureLibraries();
    };
    script.onerror = () => {
      finishWithError(new Error('Google Maps script failed to load.'));
    };
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
};
