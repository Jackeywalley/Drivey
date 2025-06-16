import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input } from '@drivemate/ui';
import { useNotification } from '@/contexts/NotificationContext';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 animate-pulse" />
  ),
});

interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

export function BookingForm() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [pickupLocation, setPickupLocation] = useState<Location>({
    address: '',
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [dropoffLocation, setDropoffLocation] = useState<Location>({
    address: '',
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [pickupTime, setPickupTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickupLocation.address || !dropoffLocation.address || !pickupTime) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickupLocation: pickupLocation.address,
          dropoffLocation: dropoffLocation.address,
          pickupTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const data = await response.json();
      showNotification('Booking created successfully!', 'success');
      router.push(`/dashboard/bookings/${data.booking.id}`);
    } catch (error) {
      console.error('Booking error:', error);
      showNotification('Failed to create booking. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="h-[400px] mb-6">
          <Map
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
            onPickupSelect={setPickupLocation}
            onDropoffSelect={setDropoffLocation}
          />
        </div>

        <Input
          label="Pickup Location"
          value={pickupLocation.address}
          onChange={(e) =>
            setPickupLocation({ ...pickupLocation, address: e.target.value })
          }
          placeholder="Enter pickup address"
          required
        />

        <Input
          label="Dropoff Location"
          value={dropoffLocation.address}
          onChange={(e) =>
            setDropoffLocation({ ...dropoffLocation, address: e.target.value })
          }
          placeholder="Enter dropoff address"
          required
        />

        <Input
          label="Pickup Time"
          type="datetime-local"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Creating Booking...' : 'Book Now'}
        </Button>
      </form>
    </Card>
  );
} 