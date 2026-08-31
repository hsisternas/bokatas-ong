import { useState, useCallback } from 'react';
import { Geolocation as NativeGeolocation } from '@capacitor/geolocation';
import type { Geolocation } from '../types';
import { isNativePlatform } from '../services/nativePlatform';

const useGeolocation = () => {
  const [location, setLocation] = useState<Geolocation>(null);
  const [error, setError] = useState<{key: string, message?: string} | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const requestLocation = useCallback(async () => {
    setLoading(true);
    if (isNativePlatform()) {
      try {
        const permission = await NativeGeolocation.requestPermissions({ permissions: ['location'] });
        if (permission.location !== 'granted' && permission.coarseLocation !== 'granted') throw new Error('permission-denied');
        const position = await NativeGeolocation.getCurrentPosition({ enableHighAccuracy: false, timeout: 10000, maximumAge: 60_000 });
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        setError(null);
      } catch (err) {
        setError({ key: 'geolocationError', message: err instanceof Error ? err.message : undefined });
      } finally {
        setLoading(false);
      }
      return;
    }
    if (!navigator.geolocation) {
      setError({ key: 'geolocationNotSupported' });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError({ key: 'geolocationError', message: err.message });
        setLoading(false);
      }
    );
  }, []);

  return { location, error, loading, requestLocation };
};

export default useGeolocation;
