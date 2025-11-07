import React, { useMemo } from 'react';
import type { Category, Resource, Geolocation } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import Map from './Map';

// Utility function to calculate distance between two lat/lng points in kilometers
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  if ((lat1 === lat2 && lon1 === lon2) || lat1 === 0 || lat2 === 0) {
    return 0;
  }
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};


interface ResourceListProps {
  category: Category;
  resources: Resource[];
  onSelectResource: (resource: Resource) => void;
  userLocation: Geolocation;
}

const ResourceCard: React.FC<{ resource: Resource, distance: number | null, onSelect: () => void }> = ({ resource, distance, onSelect }) => {
  const { locale, t } = useTranslation();

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4 flex flex-col"
    >
      <h3 className="text-lg font-bold text-text-main">{resource.name[locale]}</h3>
      <p className="text-sm text-text-light mt-1 flex-grow">{resource.description[locale]}</p>
      {distance !== null && distance > 0 && (
        <p className="text-sm text-primary font-semibold mt-2">
          {distance.toFixed(2)} {t('distanceUnit')}
        </p>
      )}
    </div>
  );
};

const ResourceList: React.FC<ResourceListProps> = ({ category, resources, onSelectResource, userLocation }) => {
  const { t } = useTranslation();
  
  const filteredAndSortedResources = useMemo(() => {
    const categoryResources = resources.filter(r => r.categoryId === category.id);

    if (userLocation) {
      const resourcesWithDistance = categoryResources.map(resource => ({
        ...resource,
        distance: calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          resource.coordinates.lat,
          resource.coordinates.lng
        )
      }));
       
      return resourcesWithDistance.sort((a, b) => {
        if (a.distance === 0 && b.distance > 0) return 1;
        if (b.distance === 0 && a.distance > 0) return -1;
        return a.distance - b.distance;
      });
    }

    return categoryResources.map(resource => ({...resource, distance: null}));
  }, [category.id, resources, userLocation]);
  
  const resourcesWithCoords = useMemo(() => {
    return filteredAndSortedResources.filter(r => r.coordinates && r.coordinates.lat !== 0);
  }, [filteredAndSortedResources]);

  const handleMarkerClick = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    if (resource) {
      onSelectResource(resource);
    }
  };


  if (filteredAndSortedResources.length === 0) {
    return <p className="text-center text-gray-500 mt-8">{t('noResources')}</p>;
  }

  return (
    <div className="flex flex-col h-full">
      {resourcesWithCoords.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden shadow-md">
          <Map 
            resources={resourcesWithCoords} 
            onMarkerClick={handleMarkerClick} 
            userLocation={userLocation}
            height="40vh"
          />
        </div>
      )}
      <div className="space-y-4">
        {filteredAndSortedResources.map(resource => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            distance={resource.distance}
            onSelect={() => onSelectResource(resource)}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourceList;