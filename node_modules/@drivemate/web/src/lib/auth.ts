import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from './db';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
);

export interface AuthUser {
  id: string;
  role: UserRole;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function signJWT(payload: any): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<any> {
  const token = cookies().get('token')?.value;
  if (!token) return null;

  const payload = await verifyJWT(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.sub as string },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  });

  return user;
}

export async function requireAuth(
  request: NextRequest
): Promise<NextResponse | null> {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const payload = await verifyJWT(token);
  if (!payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return null;
}

export async function requireRole(
  request: NextRequest,
  roles: string[]
): Promise<NextResponse | null> {
  const authResponse = await requireAuth(request);
  if (authResponse) return authResponse;

  const token = request.cookies.get('token')?.value;
  const payload = await verifyJWT(token!);
  const user = await prisma.user.findUnique({
    where: { id: payload.sub as string },
    select: { role: true },
  });

  if (!user || !roles.includes(user.role)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return null;
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  const userId = request.headers.get('x-user-id');
  const role = request.headers.get('x-user-role') as UserRole | null;

  if (!userId || !role) {
    return null;
  }

  return {
    id: userId,
    role,
  };
}

export async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      client: true,
      chauffeur: {
        include: {
          vehicle: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
} 