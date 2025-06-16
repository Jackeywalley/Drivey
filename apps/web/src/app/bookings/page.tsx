import { Metadata } from 'next';
import { Card, Button } from '@drivemate/ui';
import { useBookings } from '@/hooks/useBookings';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'My Bookings - DriveMate',
  description: 'View and manage your DriveMate bookings',
};

export default function BookingsPage() {
  const { bookings, isLoading } = useBookings();
  const { user } = useAuthContext();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <Button onClick={() => router.push('/booking')}>Book a Ride</Button>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <div className="p-6 text-center">
            <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
            <Button onClick={() => router.push('/booking')}>Book Your First Ride</Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Booking #{booking.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(booking.pickupTime), 'PPP p')}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium">{booking.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dropoff Location</p>
                    <p className="font-medium">{booking.dropoffLocation}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Chauffeur</p>
                    <p className="font-medium">
                      {booking.chauffeur
                        ? `${booking.chauffeur.firstName} ${booking.chauffeur.lastName}`
                        : 'Not assigned yet'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Vehicle</p>
                    <p className="font-medium">
                      {booking.vehicle
                        ? `${booking.vehicle.make} ${booking.vehicle.model}`
                        : 'Not assigned yet'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">${booking.totalAmount.toFixed(2)}</p>
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Handle cancel booking
                      }}
                    >
                      Cancel Booking
                    </Button>
                    <Button
                      onClick={() => {
                        // Handle contact support
                      }}
                    >
                      Contact Support
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 