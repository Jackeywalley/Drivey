import { useState, useCallback } from 'react';
import { profileApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'CLIENT' | 'CHAUFFEUR';
  client?: {
    id: string;
  };
  chauffeur?: {
    id: string;
    status: string;
    rating: number;
    totalTrips: number;
    isVerified: boolean;
    vehicle?: {
      id: string;
      make: string;
      model: string;
      year: number;
      color: string;
      licensePlate: string;
    };
  };
}

interface ProfileState {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
}

export function useProfile() {
  const [state, setState] = useState<ProfileState>({
    profile: null,
    isLoading: false,
    error: null,
  });

  const fetchProfile = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const profile = await profileApi.get();
      setState((prev) => ({ ...prev, profile, isLoading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch profile',
      }));
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (data: {
    firstName?: string;
    lastName?: string;
    [key: string]: any;
  }) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const profile = await profileApi.update(data);
      setState((prev) => ({ ...prev, profile, isLoading: false }));
      toast.success('Profile updated successfully');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update profile',
      }));
      throw error;
    }
  }, []);

  return {
    profile: state.profile,
    isLoading: state.isLoading,
    error: state.error,
    fetchProfile,
    updateProfile,
  };
} 