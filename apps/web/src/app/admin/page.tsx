import { Metadata } from 'next';
import { Card, Button } from '@drivemate/ui';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useBookings } from '@/hooks/useBookings';
import { useChauffeurs } from '@/hooks/useChauffeurs';
import { usePayments } from '@/hooks/usePayments';

export const metadata: Metadata = {
  title: 'Admin Dashboard - DriveMate',
  description: 'DriveMate admin dashboard',
};

export default function AdminDashboardPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { bookings } = useBookings();
  const { chauffeurs } = useChauffeurs();
  const { payments } = usePayments();

  // Calculate statistics
  const totalBookings = bookings.length;
  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const activeChauffeurs = chauffeurs.filter((c) => c.isAvailable).length;
  const completedBookings = bookings.filter(
    (b) => b.status === 'completed'
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold">{totalBookings}</p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Active Chauffeurs</h3>
            <p className="text-3xl font-bold">{activeChauffeurs}</p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Completed Bookings</h3>
            <p className="text-3xl font-bold">{completedBookings}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => router.push('/chauffeurs/new')}>
                Add Chauffeur
              </Button>
              <Button onClick={() => router.push('/vehicles/new')}>
                Add Vehicle
              </Button>
              <Button onClick={() => router.push('/bookings')}>
                View Bookings
              </Button>
              <Button onClick={() => router.push('/payments')}>
                View Payments
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      Booking #{booking.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.pickupLocation} to {booking.dropoffLocation}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      booking.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 