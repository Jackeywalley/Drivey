// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'client' | 'chauffeur' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Client extends User {
  role: 'client';
  defaultPaymentMethod?: string;
  walletBalance: number;
}

export interface Chauffeur extends User {
  role: 'chauffeur';
  licenseNumber: string;
  licenseExpiry: string;
  vehicleInfo?: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  };
  rating: number;
  totalRides: number;
  isAvailable: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
}

// Booking Types
export type BookingStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  clientId: string;
  chauffeurId?: string;
  status: BookingStatus;
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
  createdAt: string;
  updatedAt: string;
  fare: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  rating?: number;
  feedback?: string;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'card' | 'wallet';
  last4?: string;
  brand?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  bookingId?: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed';
  paymentMethodId: string;
  createdAt: string;
}

// Navigation Types
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Booking: undefined;
  ChauffeurProfile: { chauffeurId: string };
  RideHistory: undefined;
  Profile: undefined;
  Wallet: undefined;
  Settings: undefined;
}; 