import { Metadata } from 'next';
import { Card, Button } from '@drivemate/ui';
import { useVehicle } from '@/hooks/useVehicle';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Vehicles - DriveMate',
  description: 'View our luxury vehicles',
};

export default function VehiclesPage() {
  const { vehicle, isLoading } = useVehicle();
  const { user } = useAuthContext();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Vehicles</h1>
        {user?.role === 'admin' && (
          <Button onClick={() => router.push('/vehicles/new')}>
            Add Vehicle
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicle && (
          <Card>
            <div className="p-6">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Vehicle Image</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {vehicle.make} {vehicle.model}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 w-24">Year:</span>
                  <span>{vehicle.year}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 w-24">Color:</span>
                  <span>{vehicle.color}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 w-24">
                    License Plate:
                  </span>
                  <span>{vehicle.licensePlate}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 w-24">Chauffeur:</span>
                  <span>
                    {vehicle.chauffeurId
                      ? `Assigned to Chauffeur #${vehicle.chauffeurId}`
                      : 'Not assigned'}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                >
                  View Details
                </Button>
                {user?.role === 'admin' && (
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/vehicles/${vehicle.id}/edit`)}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
} 