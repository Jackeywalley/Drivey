import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request, ['CHAUFFEUR']);

    const chauffeur = await prisma.chauffeur.findUnique({
      where: { userId: user.id },
      include: {
        vehicle: true,
      },
    });

    if (!chauffeur?.vehicle) {
      return NextResponse.json(
        {
          success: false,
          error: 'Vehicle not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: chauffeur.vehicle,
    });
  } catch (error) {
    console.error('Failed to fetch vehicle:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch vehicle',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request, ['CHAUFFEUR']);

    const chauffeur = await prisma.chauffeur.findUnique({
      where: { userId: user.id },
      include: {
        vehicle: true,
      },
    });

    if (!chauffeur) {
      return NextResponse.json(
        {
          success: false,
          error: 'Chauffeur profile not found',
        },
        { status: 404 }
      );
    }

    if (chauffeur.vehicle) {
      return NextResponse.json(
        {
          success: false,
          error: 'Vehicle already exists',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { make, model, year, color, licensePlate } = body;

    const vehicle = await prisma.vehicle.create({
      data: {
        chauffeurId: chauffeur.id,
        make,
        model,
        year,
        color,
        licensePlate,
      },
    });

    return NextResponse.json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    console.error('Failed to create vehicle:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create vehicle',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth(request, ['CHAUFFEUR']);

    const chauffeur = await prisma.chauffeur.findUnique({
      where: { userId: user.id },
      include: {
        vehicle: true,
      },
    });

    if (!chauffeur?.vehicle) {
      return NextResponse.json(
        {
          success: false,
          error: 'Vehicle not found',
        },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { make, model, year, color, licensePlate } = body;

    const vehicle = await prisma.vehicle.update({
      where: { chauffeurId: chauffeur.id },
      data: {
        make,
        model,
        year,
        color,
        licensePlate,
      },
    });

    return NextResponse.json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    console.error('Failed to update vehicle:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update vehicle',
      },
      { status: 500 }
    );
  }
} 