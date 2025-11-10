import React, { useEffect, useRef, useState } from "react";
import type { Resource, Geolocation } from "../types";
import { useTranslation } from "../contexts/LanguageContext";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as
  | string
  | undefined;

let scriptLoadingPromise: Promise<void> | null = null;

const loadScript = () => {
  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }
  scriptLoadingPromise = new Promise((resolve, reject) => {
    if ((window as any).google && (window as any).google.maps) {
      resolve();
      return;
    }
    if (!GOOGLE_MAPS_API_KEY) {
      const errorMsg =
        "Google Maps API key is not configured. Please set VITE_GOOGLE_MAPS_API_KEY.";
      console.error(errorMsg);
      reject(new Error(errorMsg));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadingPromise = null;
      reject(new Error("Google Maps script failed to load."));
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

const Map: React.FC<MapProps> = ({
  resources,
  onMarkerClick,
  userLocation,
  height,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<(google.maps.Marker | google.maps.InfoWindow)[]>(
    []
  );
  const { locale, t } = useTranslation();
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadScript()
      .then(() => setIsApiLoaded(true))
      .catch((err) => {
        console.error(err);
        setError("Error loading map.");
      });
  }, []);

  useEffect(() => {
    if (isApiLoaded && ref.current && !map) {
      const newMap = new (window as any).google.maps.Map(ref.current, {
        center: { lat: 39.4699, lng: -0.3763 }, // Valencia
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
      });
      setMap(newMap);
    }
  }, [isApiLoaded, map]);

  useEffect(() => {
    if (!map) return;

    // Clear
    markersRef.current.forEach((m) => {
      if ("setMap" in m) (m as google.maps.Marker).setMap(null);
      else (m as google.maps.InfoWindow).close();
    });
    markersRef.current = [];

    const bounds = new (window as any).google.maps.LatLngBounds();

    if (userLocation) {
      const userMarker = new (window as any).google.maps.Marker({
        position: { lat: userLocation.latitude, lng: userLocation.longitude },
        map,
        title: t("userLocation"),
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: "#2AA7DF",
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 2,
        },
      });
      markersRef.current.push(userMarker);
      bounds.extend(userMarker.getPosition()!);
    }

    resources.forEach((resource) => {
      if (!resource.coordinates || resource.coordinates.lat === 0) return;

      const marker = new (window as any).google.maps.Marker({
        position: resource.coordinates,
        map,
        title: resource.name[locale],
      });

      const infoWindow = new (window as any).google.maps.InfoWindow({
        content: `
          <div class="font-sans">
            <h3 class="font-bold text-md mb-1">${resource.name[locale]}</h3>
            <p class="text-sm text-gray-600">${resource.address}</p>
            ${
              onMarkerClick
                ? `<button class="text-primary hover:underline text-sm mt-2" data-resource-id="${resource.id}">${t(
                    "viewDetails"
                  )}</button>`
                : ""
            }
          </div>
        `,
      });

      const openInfoWindow = () => {
        markersRef.current.forEach((it) => {
          if ("close" in it) (it as google.maps.InfoWindow).close();
        });
        infoWindow.open(map, marker);
        infoWindow.addListener("domready", () => {
          const button = document.querySelector(
            `button[data-resource-id="${resource.id}"]`
          );
          if (button && onMarkerClick) {
            button.addEventListener("click", () => onMarkerClick(resource.id));
          }
        });
      };

      marker.addListener("click", openInfoWindow);
      markersRef.current.push(marker, infoWindow);
      bounds.extend(marker.getPosition()!);
    });

    if (!bounds.isEmpty()) {
      if (resources.length > 1 || (resources.length > 0 && userLocation)) {
        map.fitBounds(bounds, 100);
      } else {
        map.setCenter(bounds.getCenter());
        map.setZoom(15);
      }
    }
  }, [map, resources, userLocation, locale, t, onMarkerClick]);

  if (error) {
    return (
      <div
        style={{ height, width: "100%" }}
        className="flex items-center justify-center bg-gray-200 text-gray-600"
      >
        {error}
      </div>
    );
  }

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div
        style={{ height, width: "100%" }}
        className="flex items-center justify-center bg-red-100 text-red-700 p-4 text-center"
      >
        Map is not available. Please configure VITE_GOOGLE_MAPS_API_KEY.
      </div>
    );
  }

  return <div ref={ref} style={{ height, width: "100%" }} className="bg-gray-200" />;
};

export default Map;
