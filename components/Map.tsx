import React, { useEffect, useRef, useState } from 'react';
import type { Resource, Geolocation } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import { loadGoogleMapsScript } from '../services/googleMapsLoader';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

let scriptLoadingPromise: Promise<void> | null = null;

const loadScript = () => {
  scriptLoadingPromise = loadGoogleMapsScript();
  return scriptLoadingPromise;
};

const buildInfoWindowContent = (
  resource: Resource,
  locale: string,
  viewDetailsLabel: string,
  onMarkerClick?: (resourceId: string) => void
): HTMLDivElement => {
  const container = document.createElement('div');
  container.className = 'font-sans';

  const title = document.createElement('h3');
  title.className = 'font-bold text-md mb-1';
  title.textContent = resource.name[locale as keyof Resource['name']];
  container.appendChild(title);

  const address = document.createElement('p');
  address.className = 'text-sm text-gray-600';
  address.textContent = resource.address;
  container.appendChild(address);

  if (onMarkerClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'text-primary hover:underline text-sm mt-2';
    button.textContent = viewDetailsLabel;
    button.addEventListener('click', () => {
      onMarkerClick(resource.id);
    });
    container.appendChild(button);
  }

  return container;
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
  const markersRef = useRef<(google.maps.Marker | google.maps.InfoWindow)[]>([]);
  const { locale, t } = useTranslation();
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (window as typeof window & { gm_authFailure?: () => void }).gm_authFailure = () => {
      setError('Map is not available for this URL. Authorize the current host in the Google Maps API key referrer settings.');
    };

    loadScript()
      .then(() => setIsApiLoaded(true))
      .catch(err => {
          console.error(err);
          const message = err instanceof Error ? err.message : 'Error loading map.';
          setError(message);
      });

    return () => {
      delete (window as typeof window & { gm_authFailure?: () => void }).gm_authFailure;
    };
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

    // Clear previous markers and info windows
    markersRef.current.forEach(markerOrInfoWindow => {
      if ('setMap' in markerOrInfoWindow) {
        (markerOrInfoWindow as google.maps.Marker).setMap(null);
      } else {
        (markerOrInfoWindow as google.maps.InfoWindow).close();
      }
    });
    markersRef.current = [];

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
                fillColor: '#2AA7DF', // --primary color
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2,
            },
        });
        markersRef.current.push(userMarker);
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

      const infoWindow = new window.google.maps.InfoWindow({
        content: buildInfoWindowContent(resource, locale, t('viewDetails'), onMarkerClick),
      });
      
      const openInfoWindow = () => {
        // Close any other open info windows
        markersRef.current.forEach(item => {
            if ('close' in item) {
                (item as google.maps.InfoWindow).close();
            }
        });
        infoWindow.open(map, marker);
      };
      
      marker.addListener('click', openInfoWindow);

      markersRef.current.push(marker, infoWindow);
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

  }, [map, resources, userLocation, locale, t, onMarkerClick]);

  if (error) {
    return <div style={{ height, width: '100%' }} className="flex items-center justify-center bg-gray-200 text-gray-600">{error}</div>
  }
  
  if (!GOOGLE_MAPS_API_KEY) {
    return <div style={{ height, width: '100%' }} className="flex items-center justify-center bg-red-100 text-red-700 p-4 text-center">
        Map is not available. Please configure the VITE_GOOGLE_MAPS_API_KEY environment variable.
    </div>
  }

  return <div ref={ref} style={{ height, width: '100%' }} className="bg-gray-200" />;
};

export default Map;
