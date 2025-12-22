import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import authSeller from '@/middlewares/authSeller';

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { productId } = await require.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Missing details: productId' },
        { status: 400 }
      );
    }

    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    // check if product exists
    const product = await prisma.product.findFirst({
      where: { id: productId, storeId },
    });

    if (!product) {
      return NextResponse.json({ error: 'No product found' }, { status: 404 });
    }

    await prisma.product.update({
      where: { id: productId },
      data: { inStock: !product.inStock },
    });

    return NextResponse.json({ message: 'Product stock updated successfully' }); 
  } catch (error) {
    console.error('Toggle stock api failed', error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
