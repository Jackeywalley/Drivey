'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '@drivemate/ui';
import { Chauffeur } from '@drivemate/types';
import { useRouter } from 'next/navigation';

interface ChauffeurFormProps {
  params: {
    id: string;
  };
}

const ChauffeurFormPage = ({ params }: ChauffeurFormProps) => {
  const router = useRouter();
  const isEditMode = params.id !== 'new';
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Chauffeur>>({
    name: '',
    email: '',
    phone: '',
    isAvailable: true,
    vehicleInfo: {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      licensePlate: '',
    },
  });

  useEffect(() => {
    if (isEditMode) {
      // TODO: Fetch chauffeur data from API
      setFormData({
        id: params.id,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        isAvailable: true,
        vehicleInfo: {
          make: 'Toyota',
          model: 'Camry',
          year: 2022,
          color: 'Black',
          licensePlate: 'ABC123',
        },
      });
    }
  }, [isEditMode, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Submit form data to API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      router.push('/admin/chauffeurs');
    } catch (error) {
      console.error('Error saving chauffeur:', error);
      alert('Failed to save chauffeur. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('vehicleInfo.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        vehicleInfo: {
          ...prev.vehicleInfo,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {isEditMode ? 'Edit Chauffeur' : 'Add New Chauffeur'}
        </h1>

        <Card className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="isAvailable"
                      value={formData.isAvailable ? 'true' : 'false'}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="true">Available</option>
                      <option value="false">Unavailable</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Make"
                    name="vehicleInfo.make"
                    value={formData.vehicleInfo?.make}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Model"
                    name="vehicleInfo.model"
                    value={formData.vehicleInfo?.model}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Year"
                    name="vehicleInfo.year"
                    type="number"
                    value={formData.vehicleInfo?.year}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Color"
                    name="vehicleInfo.color"
                    value={formData.vehicleInfo?.color}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="License Plate"
                    name="vehicleInfo.licensePlate"
                    value={formData.vehicleInfo?.licensePlate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <Button
                  title="Cancel"
                  onClick={() => router.push('/admin/chauffeurs')}
                  variant="outline"
                />
                <Button
                  title={isEditMode ? 'Save Changes' : 'Add Chauffeur'}
                  type="submit"
                  loading={loading}
                />
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ChauffeurFormPage; 