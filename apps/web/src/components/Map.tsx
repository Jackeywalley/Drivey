import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.78825,
  lng: -122.4324,
};

interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  pickupLocation: Location;
  dropoffLocation: Location;
  onPickupSelect: (location: Location) => void;
  onDropoffSelect: (location: Location) => void;
}

export default function Map({
  pickupLocation,
  dropoffLocation,
  onPickupSelect,
  onDropoffSelect,
}: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return;

      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Determine if this is pickup or dropoff based on which one is empty
      if (!pickupLocation.address) {
        onPickupSelect({
          address: `${lat}, ${lng}`,
          latitude: lat,
          longitude: lng,
        });
      } else if (!dropoffLocation.address) {
        onDropoffSelect({
          address: `${lat}, ${lng}`,
          latitude: lat,
          longitude: lng,
        });
      }
    },
    [pickupLocation.address, dropoffLocation.address, onPickupSelect, onDropoffSelect]
  );

  const calculateRoute = useCallback(async () => {
    if (!map || !pickupLocation.address || !dropoffLocation.address) return;

    const directionsService = new google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: { lat: pickupLocation.latitude, lng: pickupLocation.longitude },
      destination: { lat: dropoffLocation.latitude, lng: dropoffLocation.longitude },
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirections(result);
  }, [map, pickupLocation, dropoffLocation]);

  React.useEffect(() => {
    if (pickupLocation.address && dropoffLocation.address) {
      calculateRoute();
    }
  }, [pickupLocation, dropoffLocation, calculateRoute]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {pickupLocation.address && (
        <Marker
          position={{
            lat: pickupLocation.latitude,
            lng: pickupLocation.longitude,
          }}
          label="P"
        />
      )}

      {dropoffLocation.address && (
        <Marker
          position={{
            lat: dropoffLocation.latitude,
            lng: dropoffLocation.longitude,
          }}
          label="D"
        />
      )}

      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
} 