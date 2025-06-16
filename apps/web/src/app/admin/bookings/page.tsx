'use client';

import React, { useState } from 'react';
import { Card, Button, Input } from '@drivemate/ui';
import { Booking } from '@drivemate/types';

const BookingManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  >('all');

  // TODO: Fetch bookings data from API
  const bookings: Partial<Booking>[] = [
    {
      id: '1',
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
    },
    // Add more sample bookings
  ];

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.pickupLocation?.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.dropoffLocation?.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === 'all' || booking.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Booking Management</h1>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by pickup or dropoff location"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(
                  e.target.value as
                    | 'all'
                    | 'pending'
                    | 'confirmed'
                    | 'in-progress'
                    | 'completed'
                    | 'cancelled'
                )
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Bookings List */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Pickup</th>
                <th className="text-left py-3 px-4">Dropoff</th>
                <th className="text-left py-3 px-4">Scheduled Time</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Fare</th>
                <th className="text-left py-3 px-4">Rating</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{booking.id}</td>
                  <td className="py-3 px-4">{booking.pickupLocation?.address}</td>
                  <td className="py-3 px-4">{booking.dropoffLocation?.address}</td>
                  <td className="py-3 px-4">
                    {new Date(booking.scheduledTime || '').toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                        booking.status || ''
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">${booking.fare?.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    {booking.rating ? `${booking.rating} ★` : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button
                        title="View Details"
                        onClick={() => {
                          // TODO: Navigate to booking details
                        }}
                        variant="outline"
                        size="sm"
                      />
                      {booking.status === 'pending' && (
                        <Button
                          title="Assign Chauffeur"
                          onClick={() => {
                            // TODO: Navigate to chauffeur assignment
                          }}
                          variant="outline"
                          size="sm"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default BookingManagementPage; 