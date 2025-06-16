import React, { useState } from 'react';
import { Card, Button, Input } from '@drivemate/ui';
import { Chauffeur } from '@drivemate/types';

const ChauffeurManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'available' | 'unavailable'>('all');

  // TODO: Fetch chauffeurs data from API
  const chauffeurs: Partial<Chauffeur>[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      rating: 4.8,
      totalRides: 150,
      isAvailable: true,
      vehicleInfo: {
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        color: 'Black',
        licensePlate: 'ABC123',
      },
    },
    // Add more sample chauffeurs
  ];

  const filteredChauffeurs = chauffeurs.filter((chauffeur) => {
    const matchesSearch =
      chauffeur.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chauffeur.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chauffeur.phone?.includes(searchQuery);

    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'available' && chauffeur.isAvailable) ||
      (selectedStatus === 'unavailable' && !chauffeur.isAvailable);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chauffeur Management</h1>
        <Button
          title="Add New Chauffeur"
          onClick={() => {
            // TODO: Navigate to add chauffeur form
          }}
        />
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or phone"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as 'all' | 'available' | 'unavailable')
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Chauffeurs List */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Contact</th>
                <th className="text-left py-3 px-4">Vehicle</th>
                <th className="text-left py-3 px-4">Rating</th>
                <th className="text-left py-3 px-4">Total Rides</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredChauffeurs.map((chauffeur) => (
                <tr key={chauffeur.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{chauffeur.name}</td>
                  <td className="py-3 px-4">
                    <div>{chauffeur.email}</div>
                    <div className="text-sm text-gray-500">{chauffeur.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      {chauffeur.vehicleInfo?.year} {chauffeur.vehicleInfo?.make}{' '}
                      {chauffeur.vehicleInfo?.model}
                    </div>
                    <div className="text-sm text-gray-500">
                      {chauffeur.vehicleInfo?.licensePlate}
                    </div>
                  </td>
                  <td className="py-3 px-4">{chauffeur.rating} ★</td>
                  <td className="py-3 px-4">{chauffeur.totalRides}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        chauffeur.isAvailable
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {chauffeur.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button
                        title="Edit"
                        onClick={() => {
                          // TODO: Navigate to edit chauffeur
                        }}
                        variant="outline"
                        size="sm"
                      />
                      <Button
                        title="View Details"
                        onClick={() => {
                          // TODO: Navigate to chauffeur details
                        }}
                        variant="outline"
                        size="sm"
                      />
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

export default ChauffeurManagementPage; 