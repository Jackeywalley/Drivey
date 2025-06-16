import { Metadata } from 'next';
import { Card, Button } from '@drivemate/ui';
import { useAuthContext } from '@/contexts/AuthContext';
import { useBookings } from '@/hooks/useBookings';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Dashboard - DriveMate',
  description: 'Your DriveMate dashboard',
};

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { bookings } = useBookings();
  const router = useRouter();

  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status === 'pending' &&
      new Date(booking.pickupTime) > new Date()
  );

  const recentBookings = bookings
    .filter((booking) => booking.status === 'completed')
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your bookings
          </p>
        </div>
        <Button onClick={() => router.push('/booking')}>Book a Ride</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Upcoming Bookings</h2>
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No upcoming bookings</p>
                  <Button onClick={() => router.push('/booking')}>
                    Book a Ride
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {booking.pickupLocation} to{' '}
                          {booking.dropoffLocation}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(booking.pickupTime), 'PPP p')}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() =>
                          router.push(`/bookings/${booking.id}`)
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Recent Bookings</h2>
              {recentBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent bookings</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {booking.pickupLocation} to{' '}
                          {booking.dropoffLocation}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(booking.pickupTime), 'PPP')}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() =>
                          router.push(`/bookings/${booking.id}`)
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/bookings')}
              >
                View All Bookings
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/payments')}
              >
                View Payment History
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/profile')}
              >
                Update Profile
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 