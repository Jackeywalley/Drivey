import { useState, useCallback } from 'react';
import { vehicleApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface Vehicle {
  id: string;
  chauffeurId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
}

interface VehicleState {
  vehicle: Vehicle | null;
  isLoading: boolean;
  error: string | null;
}

export function useVehicle() {
  const [state, setState] = useState<VehicleState>({
    vehicle: null,
    isLoading: false,
    error: null,
  });

  const fetchVehicle = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const vehicle = await vehicleApi.get();
      setState((prev) => ({ ...prev, vehicle, isLoading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch vehicle',
      }));
      throw error;
    }
  }, []);

  const createVehicle = useCallback(async (data: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  }) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const vehicle = await vehicleApi.create(data);
      setState((prev) => ({ ...prev, vehicle, isLoading: false }));
      toast.success('Vehicle created successfully');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create vehicle',
      }));
      throw error;
    }
  }, []);

  const updateVehicle = useCallback(async (data: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  }) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const vehicle = await vehicleApi.update(data);
      setState((prev) => ({ ...prev, vehicle, isLoading: false }));
      toast.success('Vehicle updated successfully');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update vehicle',
      }));
      throw error;
    }
  }, []);

  return {
    vehicle: state.vehicle,
    isLoading: state.isLoading,
    error: state.error,
    fetchVehicle,
    createVehicle,
    updateVehicle,
  };
} 