import prisma from '@/lib/prisma';
import authAdmin from '@/middlewares/authAdmin';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// toggle store is available
export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const isAdmin = authAdmin(userId);

    if (!isAdmin) {
      return NextResponse.json({ error: 'not authorized' }, { status: 401 });
    }

    const { storeId } = await request.json();

    if (!storeId) {
      return NextResponse.json({ error: 'Missing store id' }, { statu });
    }

    // find the store:
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { statu: 400 });
    }

    await prisma.store.update({
      where: { id: storeId },
      data: { isActive: !store.isActive },
    });

    return NextResponse.json({ message: 'Store updated successfully' });
  } catch (error) {
    console.error('failed to get the store status', error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
