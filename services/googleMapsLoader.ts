const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
    if (window.google?.maps?.places) {
      resolve();
      return;
    }

    if (!GOOGLE_MAPS_API_KEY) {
      reject(new Error('Google Maps API key is not configured'));
      return;
    }

    const existingScript = document.querySelector('script[data-google-maps="true"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Google Maps script failed to load.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = getScriptSrc();
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = 'true';
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadingPromise = null;
      reject(new Error('Google Maps script failed to load.'));
    };
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
};
