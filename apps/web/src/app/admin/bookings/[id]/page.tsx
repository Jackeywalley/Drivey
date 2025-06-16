'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button } from '@drivemate/ui';
import { Booking } from '@drivemate/types';
import { useRouter } from 'next/navigation';

interface BookingDetailsProps {
  params: {
    id: string;
  };
}

const BookingDetailsPage = ({ params }: BookingDetailsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<Partial<Booking>>();

  useEffect(() => {
    // TODO: Fetch booking data from API
    setBooking({
      id: params.id,
      clientId: 'client1',
      chauffeurId: 'chauffeur1',
      pickupLocation: {
        address: '123 Main St',
        latitude: 40.7128,
        longitude: -74.006,
      },
      dropoffLocation: {
        address: '456 Park Ave',
        latitude: 40.7829,
        longitude: -73.9654,
      },
      scheduledTime: new Date().toISOString(),
      status: 'confirmed',
      fare: 50.0,
      rating: 4.5,
    });
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Booking not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Booking Details</h1>
          <Button
            title="Back to Bookings"
            onClick={() => router.push('/admin/bookings')}
            variant="outline"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Booking Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1">{booking.status}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Scheduled Time
                </label>
                <div className="mt-1">
                  {new Date(booking.scheduledTime || '').toLocaleString()}
                </div>
              </div>
            </div>
          </Card>

          {/* Location Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Location Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pickup Location
                </label>
                <div className="mt-1">{booking.pickupLocation?.address}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dropoff Location
                </label>
                <div className="mt-1">{booking.dropoffLocation?.address}</div>
              </div>
            </div>
          </Card>

          {/* Payment Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fare
                </label>
                <div className="mt-1">${booking.fare?.toFixed(2)}</div>
              </div>
            </div>
          </Card>

          {/* Rating Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Rating Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <div className="mt-1">
                  {booking.rating ? `${booking.rating} ★` : 'Not rated yet'}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage; 