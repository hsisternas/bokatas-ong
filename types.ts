import type React from 'react';

// FIX: Moved google namespace into declare global to make types available project-wide,
// which resolves "Cannot find namespace 'google'" errors in other files.
declare global {
  interface Window {
    google: any;
  }

  // These are simplified types for what's used in the Map component.
  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element | null, opts?: any);
        fitBounds(bounds: LatLngBounds, padding?: number): void;
        setCenter(latLng: any): void;
        setZoom(zoom: number): void;
        addListener(eventName: string, handler: Function): any;
      }
      class Marker {
        constructor(opts?: any);
        getPosition(): any;
        setMap(map: Map | null): void;
        addListener(eventName: string, handler: Function): any;
      }
      class InfoWindow {
        constructor(opts?: any);
        open(map: Map, anchor?: any): void;
        close(): void;
      }
      class LatLngBounds {
        constructor(sw?: any, ne?: any);
        extend(point: any): void;
        getCenter(): any;
        isEmpty(): boolean;
      }
      const SymbolPath: {
        CIRCLE: number;
      };
    }
  }
}

export type Locale = 'es' | 'en' | 'it' | 'ar' | 'fr';

export type LocalizedString = {
  [key in Locale]: string;
};

export interface Category {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: React.FC<{ className?: string }>;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Resource {
  id: string;
  categoryId: string;
  name: LocalizedString;
  description: LocalizedString;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coordinates: Coordinates;
  updated?: string;
}

export type Geolocation = {
  latitude: number;
  longitude: number;
} | null;

export type View =
  | { type: 'categories' }
  | { type: 'list'; category: Category }
  | { type: 'detail'; resource: Resource };
