import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { ChauffeurStatus } from '@prisma/client';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request);
    const { status } = await request.json();

    // Validate status
    if (!Object.values(ChauffeurStatus).includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status',
        },
        { status: 400 }
      );
    }

    // Get chauffeur
    const chauffeur = await prisma.chauffeur.findUnique({
      where: { id: params.id },
      include: {
        user: true,
      },
    });

    if (!chauffeur) {
      return NextResponse.json(
        {
          success: false,
          error: 'Chauffeur not found',
        },
        { status: 404 }
      );
    }

    // Check permissions
    if (
      user.role === 'CHAUFFEUR' &&
      chauffeur.userId !== user.id
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Forbidden',
        },
        { status: 403 }
      );
    }

    // Update chauffeur status
    const updatedChauffeur = await prisma.chauffeur.update({
      where: { id: params.id },
      data: { status },
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
    });

    return NextResponse.json({
      success: true,
      data: updatedChauffeur,
    });
  } catch (error) {
    console.error('Failed to update chauffeur status:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update chauffeur status',
      },
      { status: 500 }
    );
  }
} 