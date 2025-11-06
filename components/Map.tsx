import React, { useEffect, useRef, useState } from 'react';
import type { Resource, Geolocation } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // <-- ASUMIENDO CRA

// ... (loadScript se queda igual) ...
let scriptLoadingPromise: Promise<void> | null = null;

const loadScript = () => {
  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }
  scriptLoadingPromise = new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
    if (!GOOGLE_MAPS_API_KEY) {
        console.error("Google Maps API key is not configured.");
        reject(new Error("Google Maps API key is not configured."));
        return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadingPromise = null;
      reject(new Error('Google Maps script failed to load.'));
    };
    document.head.appendChild(script);
  });
  return scriptLoadingPromise;
};

interface MapProps {
  resources: Resource[];
  onMarkerClick?: (resourceId: string) => void;
  userLocation?: Geolocation;
  height: string;
}

const Map: React.FC<MapProps> = ({ resources, onMarkerClick, userLocation, height }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // FIX: Renombrado para ser más claro. Almacenará marcadores e infoWindows.
  const mapElementsRef = useRef<(google.maps.Marker | google.maps.InfoWindow)[]>([]);
  const { locale, t } = useTranslation();
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadScript()
      .then(() => setIsApiLoaded(true))
      .catch(err => {
          console.error(err);
          setError("Error loading map.");
      });
  }, []);

  useEffect(() => {
    if (isApiLoaded && ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: { lat: 39.4699, lng: -0.3763 }, // Default to Valencia
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
      });
      setMap(newMap);
    }
  }, [isApiLoaded, ref, map]);

  useEffect(() => {
    if (!map) return;

    const bounds = new window.google.maps.LatLngBounds();

    // Add user location marker
    if (userLocation) {
        const userMarker = new window.google.maps.Marker({
            position: { lat: userLocation.latitude, lng: userLocation.longitude },
            map,
            title: t('userLocation'),
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: '#22A9DF',
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2,
            },
        });
        mapElementsRef.current.push(userMarker);
        bounds.extend(userMarker.getPosition()!);
    }

    // Add resource markers
    resources.forEach(resource => {
      if (!resource.coordinates || resource.coordinates.lat === 0) return;

      const marker = new window.google.maps.Marker({
        position: resource.coordinates,
        map,
        title: resource.name[locale],
      });

      const infoWindowContent = `
        <div class="font-sans">
          <h3 class="font-bold text-md mb-1">${resource.name[locale]}</h3>
          <p class="text-sm text-gray-600">${resource.address}</p>
          ${onMarkerClick ? `<button class="text-[#22A9DF] hover:underline text-sm mt-2" data-resource-id="${resource.id}">${t('viewDetails')}</button>` : ''}
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoWindowContent,
      });
      
      const openInfoWindow = () => {
        // Close any other open info windows
        mapElementsRef.current.forEach(item => {
            if ('close' in item) {
                (item as google.maps.InfoWindow).close();
            }
        });
        infoWindow.open(map, marker);
        
        // El listener 'domready' es necesario para añadir el evento al botón
        const domReadyListener = infoWindow.addListener('domready', () => {
            const button = document.querySelector(`button[data-resource-id="${resource.id}"]`);
            if (button && onMarkerClick) {
                button.addEventListener('click', () => {
                    onMarkerClick(resource.id);
                });
            }
        });
        // IMPORTANTE: Este listener NO se limpia automáticamente,
        // pero lo limpiaremos con clearInstanceListeners en el cleanup.
      };
      
      marker.addListener('click', openInfoWindow);

      mapElementsRef.current.push(marker, infoWindow);
      bounds.extend(marker.getPosition()!);
    });

    if (!bounds.isEmpty()) {
      if (resources.length > 1 || (resources.length > 0 && userLocation)) {
        map.fitBounds(bounds, 100); // padding
      } else {
        map.setCenter(bounds.getCenter());
        map.setZoom(15);
      }
    }

    // *** ¡LA PARTE IMPORTANTE! ***
    // Esta es la función de limpieza. Se ejecuta cuando el
    // componente se desmonta O antes de que este efecto se
    // vuelva a ejecutar.
    return () => {
        mapElementsRef.current.forEach(element => {
            // 1. Elimina CUALQUIER listener de Google (click, domready, etc.)
            // Esto previene las fugas de memoria.
            google.maps.event.clearInstanceListeners(element);

            // 2. Si es un marcador, quítalo del mapa.
            if ('setMap' in element) {
                (element as google.maps.Marker).setMap(null);
            }
        });
        // 3. Resetea la referencia
        mapElementsRef.current = [];
    };

  }, [map, resources, userLocation, locale, t, onMarkerClick]); // Estas dependencias ahora son "seguras" gracias al useCallback y la limpieza

  // ... (El resto del componente se queda igual) ...
  if (error) {
    return <div style={{ height, width: '100%' }} className="flex items-center justify-center bg-gray-200 text-gray-600">{error}</div>
  }
  
  if (!GOOGLE_MAPS_API_KEY) {
    return <div style={{ height, width: '100%' }} className="flex items-center justify-center bg-red-100 text-red-700 p-4 text-center">
        Map is not available. The Google Maps API key is missing.
    </div>
  }

  return <div ref={ref} style={{ height, width: '100%' }} className="bg-gray-200" />;
};

export default Map;