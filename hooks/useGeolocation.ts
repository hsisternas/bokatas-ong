import { useState, useCallback } from 'react';
import type { Geolocation } from '../types';

const useGeolocation = () => {
  const [location, setLocation] = useState<Geolocation>(null);
  const [error, setError] = useState<{key: string, message?: string} | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError({ key: 'geolocationNotSupported' });
      return;
    }

    setLoading(true);
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