import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// get store information for all
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username').toLowerCase();

    if (!username) {
      return NextResponse.json({ error: 'Missing username' }, { status: 400 });
    }

    // get store info and inStock products with ratings
    const store = await prisma.store.findUnique({
      where: { username, isActive: true },
      include: { Product: { include: { rating: true } } },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found!' }, { status: 400 });
    }

    return NextResponse.json({ store });
  } catch (error) {
    console.error('Failed to get all data', error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
