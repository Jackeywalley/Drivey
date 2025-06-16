import { toast } from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data: ApiResponse<T> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'An error occurred');
  }

  return data.data as T;
}

export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'An error occurred');
    }

    return handleResponse<T>(response);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'An error occurred');
    throw error;
  }
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'CLIENT' | 'CHAUFFEUR';
  }) =>
    api('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Bookings API
export const bookingsApi = {
  getAll: (params?: { clientId?: string; chauffeurId?: string; status?: string }) =>
    api('/api/bookings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  create: (data: {
    clientId: string;
    chauffeurId: string;
    pickup: { address: string; latitude: number; longitude: number };
    dropoff: { address: string; latitude: number; longitude: number };
    scheduledFor: string;
    fare: number;
  }) =>
    api('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStatus: (id: string, status: string) =>
    api(`/api/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

// Chauffeurs API
export const chauffeursApi = {
  getAll: (params?: { status?: string; isVerified?: boolean }) =>
    api('/api/chauffeurs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  search: (params: { latitude: number; longitude: number; radius?: number }) =>
    api('/api/chauffeurs/search', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  updateStatus: (id: string, status: string) =>
    api(`/api/chauffeurs/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),

  verify: (id: string) =>
    api(`/api/chauffeurs/${id}/verify`, {
      method: 'PUT',
    }),
};

// Payments API
export const paymentsApi = {
  getAll: (params?: { bookingId?: string; status?: string }) =>
    api('/api/payments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  create: (data: {
    bookingId: string;
    amount: number;
    method: string;
  }) =>
    api('/api/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStatus: (id: string, status: string) =>
    api(`/api/payments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

// Profile API
export const profileApi = {
  get: () => api('/api/profile'),
  update: (data: {
    firstName?: string;
    lastName?: string;
    [key: string]: any;
  }) =>
    api('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Vehicle API
export const vehicleApi = {
  get: () => api('/api/vehicle'),
  create: (data: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  }) =>
    api('/api/vehicle', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  }) =>
    api('/api/vehicle', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
}; 