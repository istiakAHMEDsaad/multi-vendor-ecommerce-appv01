import imagekit from '@/configs/imagekit';
import prisma from '@/lib/prisma';
import authAdmin from '@/middlewares/authAdmin';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
  } catch (error) {
    console.error('is admin api failed', error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
