'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button } from '@drivemate/ui';
import { Client } from '@drivemate/types';
import { useRouter } from 'next/navigation';

interface ClientDetailsProps {
  params: {
    id: string;
  };
}

const ClientDetailsPage = ({ params }: ClientDetailsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<Partial<Client>>();

  useEffect(() => {
    // TODO: Fetch client data from API
    setClient({
      id: params.id,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      isActive: true,
      totalRides: 25,
      totalSpent: 1250.0,
      createdAt: new Date().toISOString(),
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

  if (!client) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Client not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Client Details</h1>
          <Button
            title="Back to Clients"
            onClick={() => router.push('/admin/clients')}
            variant="outline"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Client Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">{client.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">{client.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <div className="mt-1">{client.phone}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Member Since
                </label>
                <div className="mt-1">
                  {new Date(client.createdAt || '').toLocaleDateString()}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      client.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {client.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Ride Statistics */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Ride Statistics</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Rides
                </label>
                <div className="mt-1">{client.totalRides}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Spent
                </label>
                <div className="mt-1">${client.totalSpent?.toFixed(2)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Average Fare
                </label>
                <div className="mt-1">
                  $
                  {(
                    (client.totalSpent || 0) / (client.totalRides || 1)
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage; 