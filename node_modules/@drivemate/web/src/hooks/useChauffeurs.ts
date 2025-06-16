import { useState, useCallback } from 'react';
import { chauffeursApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface Chauffeur {
  id: string;
  userId: string;
  status: string;
  rating: number;
  totalTrips: number;
  isVerified: boolean;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  vehicle?: {
    id: string;
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  };
}

interface ChauffeursState {
  chauffeurs: Chauffeur[];
  isLoading: boolean;
  error: string | null;
}

export function useChauffeurs() {
  const [state, setState] = useState<ChauffeursState>({
    chauffeurs: [],
    isLoading: false,
    error: null,
  });

  const fetchChauffeurs = useCallback(async (params?: {
    status?: string;
    isVerified?: boolean;
  }) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const chauffeurs = await chauffeursApi.getAll(params);
      setState((prev) => ({ ...prev, chauffeurs, isLoading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch chauffeurs',
      }));
      throw error;
    }
  }, []);

  const searchChauffeurs = useCallback(async (params: {
    latitude: number;
    longitude: number;
    radius?: number;
  }) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const chauffeurs = await chauffeursApi.search(params);
      setState((prev) => ({ ...prev, chauffeurs, isLoading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to search chauffeurs',
      }));
      throw error;
    }
  }, []);

  const updateChauffeurStatus = useCallback(async (id: string, status: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const updatedChauffeur = await chauffeursApi.updateStatus(id, status);
      setState((prev) => ({
        ...prev,
        chauffeurs: prev.chauffeurs.map((chauffeur) =>
          chauffeur.id === id ? updatedChauffeur : chauffeur
        ),
        isLoading: false,
      }));
      toast.success('Chauffeur status updated successfully');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update chauffeur status',
      }));
      throw error;
    }
  }, []);

  const verifyChauffeur = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const updatedChauffeur = await chauffeursApi.verify(id);
      setState((prev) => ({
        ...prev,
        chauffeurs: prev.chauffeurs.map((chauffeur) =>
          chauffeur.id === id ? updatedChauffeur : chauffeur
        ),
        isLoading: false,
      }));
      toast.success('Chauffeur verified successfully');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to verify chauffeur',
      }));
      throw error;
    }
  }, []);

  return {
    chauffeurs: state.chauffeurs,
    isLoading: state.isLoading,
    error: state.error,
    fetchChauffeurs,
    searchChauffeurs,
    updateChauffeurStatus,
    verifyChauffeur,
  };
} 