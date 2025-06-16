import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export async function geocodeAddress(address: string): Promise<Location | null> {
  try {
    const response = await client.geocode({
      params: {
        address,
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    if (response.data.results.length === 0) {
      return null;
    }

    const result = response.data.results[0];
    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      address: result.formatted_address,
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}

export async function getDirections(
  origin: Location,
  destination: Location
): Promise<{
  distance: string;
  duration: string;
  polyline: string;
} | null> {
  try {
    const response = await client.directions({
      params: {
        origin: `${origin.lat},${origin.lng}`,
        destination: `${destination.lat},${destination.lng}`,
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    if (response.data.routes.length === 0) {
      return null;
    }

    const route = response.data.routes[0];
    const leg = route.legs[0];

    return {
      distance: leg.distance.text,
      duration: leg.duration.text,
      polyline: route.overview_polyline.points,
    };
  } catch (error) {
    console.error('Error getting directions:', error);
    return null;
  }
}

export async function calculatePrice(
  origin: Location,
  destination: Location
): Promise<number> {
  const directions = await getDirections(origin, destination);
  if (!directions) return 0;

  // Convert distance from string (e.g., "5.2 km") to number
  const distance = parseFloat(directions.distance.split(' ')[0]);
  
  // Base price calculation
  const basePrice = 10; // Base fare
  const pricePerKm = 2.5; // Price per kilometer
  const minimumPrice = 20; // Minimum fare

  const calculatedPrice = basePrice + (distance * pricePerKm);
  return Math.max(calculatedPrice, minimumPrice);
}

export async function findNearbyChauffeurs(
  location: Location,
  radius: number = 5000 // 5km radius
): Promise<Array<{ id: string; distance: number }>> {
  try {
    // This is a simplified version. In a real application,
    // you would query your database for chauffeurs within the radius
    // and calculate their distances using the Haversine formula
    const chauffeurs = await prisma.user.findMany({
      where: {
        role: 'CHAUFFEUR',
        vehicles: {
          some: {
            status: 'ACTIVE',
          },
        },
      },
      select: {
        id: true,
        profile: {
          select: {
            address: true,
          },
        },
      },
    });

    const nearbyChauffeurs = await Promise.all(
      chauffeurs.map(async (chauffeur) => {
        if (!chauffeur.profile?.address) return null;

        const chauffeurLocation = await geocodeAddress(chauffeur.profile.address);
        if (!chauffeurLocation) return null;

        const distance = calculateDistance(
          location.lat,
          location.lng,
          chauffeurLocation.lat,
          chauffeurLocation.lng
        );

        if (distance <= radius) {
          return {
            id: chauffeur.id,
            distance,
          };
        }

        return null;
      })
    );

    return nearbyChauffeurs.filter((c): c is { id: string; distance: number } => c !== null);
  } catch (error) {
    console.error('Error finding nearby chauffeurs:', error);
    return [];
  }
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
} 