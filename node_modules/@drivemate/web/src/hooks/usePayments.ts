import { useState, useCallback } from 'react';
import { paymentsApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: string;
  method: string;
  booking: {
    id: string;
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
  };
}

interface PaymentsState {
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
}

export function usePayments() {
  const [state, setState] = useState<PaymentsState>({
    payments: [],
    isLoading: false,
    error: null,
  });

  const fetchPayments = useCallback(async (params?: {
    bookingId?: string;
    status?: string;
  }) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const payments = await paymentsApi.getAll(params);
      setState((prev) => ({ ...prev, payments, isLoading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch payments',
      }));
      throw error;
    }
  }, []);

  const createPayment = useCallback(async (data: {
    bookingId: string;
    amount: number;
    method: string;
  }) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const payment = await paymentsApi.create(data);
      setState((prev) => ({
        ...prev,
        payments: [payment, ...prev.payments],
        isLoading: false,
      }));
      toast.success('Payment created successfully');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create payment',
      }));
      throw error;
    }
  }, []);

  const updatePaymentStatus = useCallback(async (id: string, status: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const updatedPayment = await paymentsApi.updateStatus(id, status);
      setState((prev) => ({
        ...prev,
        payments: prev.payments.map((payment) =>
          payment.id === id ? updatedPayment : payment
        ),
        isLoading: false,
      }));
      toast.success('Payment status updated successfully');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update payment status',
      }));
      throw error;
    }
  }, []);

  return {
    payments: state.payments,
    isLoading: state.isLoading,
    error: state.error,
    fetchPayments,
    createPayment,
    updatePaymentStatus,
  };
} 