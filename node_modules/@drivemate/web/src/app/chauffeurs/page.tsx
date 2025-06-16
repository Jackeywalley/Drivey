import { Metadata } from 'next';
import { Card, Button } from '@drivemate/ui';
import { useChauffeurs } from '@/hooks/useChauffeurs';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Chauffeurs - DriveMate',
  description: 'View our professional chauffeurs',
};

export default function ChauffeursPage() {
  const { chauffeurs, isLoading } = useChauffeurs();
  const { user } = useAuthContext();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Chauffeurs</h1>
        {user?.role === 'admin' && (
          <Button onClick={() => router.push('/chauffeurs/new')}>
            Add Chauffeur
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chauffeurs.map((chauffeur) => (
          <Card key={chauffeur.id}>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl">
                    {chauffeur.firstName[0]}
                    {chauffeur.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {chauffeur.firstName} {chauffeur.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {chauffeur.vehicle
                      ? `${chauffeur.vehicle.make} ${chauffeur.vehicle.model}`
                      : 'No vehicle assigned'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 w-24">Experience:</span>
                  <span>{chauffeur.experience} years</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 w-24">Rating:</span>
                  <span>{chauffeur.rating.toFixed(1)}/5.0</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 w-24">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      chauffeur.isAvailable
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {chauffeur.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/chauffeurs/${chauffeur.id}`)}
                >
                  View Profile
                </Button>
                {user?.role === 'admin' && (
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/chauffeurs/${chauffeur.id}/edit`)}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 