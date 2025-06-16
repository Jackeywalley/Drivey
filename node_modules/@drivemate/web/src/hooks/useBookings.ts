import { useState, useCallback } from 'react';
import { bookingsApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface Booking {
  id: string;
  clientId: string;
  chauffeurId: string;
  pickup: {
    address: string;
    latitude: number;
    longitude: number;
  };
  dropoff: {
    address: string;
    latitude: number;
    longitude: number;
  };
  scheduledFor: string;
  status: string;
  fare: number;
  client: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  };
  chauffeur: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  };
  payment?: {
    id: string;
    status: string;
    amount: number;
  };
}

interface BookingsState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
}

export function useBookings() {
  const [state, setState] = useState<BookingsState>({
    bookings: [],
    isLoading: false,
    error: null,
  });

  const fetchBookings = useCallback(async (params?: {
    clientId?: string;
    chauffeurId?: string;
    status?: string;
  }) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const bookings = await bookingsApi.getAll(params);
      setState((prev) => ({ ...prev, bookings, isLoading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch bookings',
      }));
      throw error;
    }
  }, []);

  const createBooking = useCallback(async (data: {
    clientId: string;
    chauffeurId: string;
    pickup: { address: string; latitude: number; longitude: number };
    dropoff: { address: string; latitude: number; longitude: number };
    scheduledFor: string;
    fare: number;
  }) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const booking = await bookingsApi.create(data);
      setState((prev) => ({
        ...prev,
        bookings: [booking, ...prev.bookings],
        isLoading: false,
      }));
      toast.success('Booking created successfully');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create booking',
      }));
      throw error;
    }
  }, []);

  const updateBookingStatus = useCallback(async (id: string, status: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const updatedBooking = await bookingsApi.updateStatus(id, status);
      setState((prev) => ({
        ...prev,
        bookings: prev.bookings.map((booking) =>
          booking.id === id ? updatedBooking : booking
        ),
        isLoading: false,
      }));
      toast.success('Booking status updated successfully');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update booking status',
      }));
      throw error;
    }
  }, []);

  return {
    bookings: state.bookings,
    isLoading: state.isLoading,
    error: state.error,
    fetchBookings,
    createBooking,
    updateBookingStatus,
  };
} 