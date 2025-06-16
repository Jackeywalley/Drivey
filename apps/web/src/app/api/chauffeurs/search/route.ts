import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const { searchParams } = new URL(request.url);

    const latitude = parseFloat(searchParams.get('latitude') || '0');
    const longitude = parseFloat(searchParams.get('longitude') || '0');
    const radius = parseFloat(searchParams.get('radius') || '10'); // Default 10km radius

    // TODO: Implement actual geospatial search
    // For now, we'll just return all available chauffeurs
    const chauffeurs = await prisma.chauffeur.findMany({
      where: {
        status: 'AVAILABLE',
        isVerified: true,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        vehicle: true,
      },
      orderBy: {
        rating: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: chauffeurs,
    });
  } catch (error) {
    console.error('Failed to search chauffeurs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to search chauffeurs',
      },
      { status: 500 }
    );
  }
} 