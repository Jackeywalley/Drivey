import { Metadata } from 'next';
import { BookingForm } from '@/components/BookingForm';

export const metadata: Metadata = {
  title: 'Book a Ride - DriveMate',
  description: 'Book your premium chauffeur service',
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Book Your Ride
            </h1>
            <p className="mt-3 text-xl text-gray-500">
              Fill in the details below to book your premium chauffeur service.
            </p>
          </div>

          <div className="mt-12">
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  );
} 