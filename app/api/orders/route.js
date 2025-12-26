import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { userId, has } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }
    const { addressId, items, couponCode, paymentMethod } =
      await request.json();

    if (
      !addressId ||
      !paymentMethod ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: 'Missing order details' },
        { status: 400 }
      );
    }

    let coupon = null;

    if (couponCode) {
      if (!coupon) {
        return NextResponse.json(
          { error: 'Coupon not found' },
          { status: 400 }
        );
      }
      coupon = await prisma.coupon.findUnique({
        where: { code: couponCode },
      });
    }

    // check if coupon is applicable for new users
    if (couponCode && coupon.forNewUser) {
      const userorders = await prisma.order.findMany({
        where: { userId },
      });

      if (userorders.length > 0) {
        return NextResponse.json(
          { error: 'Coupon valid for new users' },
          { status: 400 }
        );
      }
    }

    const isPlusMember = has({ plan: 'plus' });
    // check if coupon is applicable for members
    if (couponCode && coupon.forMember) {
      if (!isPlusMember) {
        return NextResponse.json(
          { error: 'Coupon valid for members only' },
          { status: 400 }
        );
      }
    }

    // group orders by storeId using a map
    const ordersByStore = new Map();
    for(const item of items){
      const product =await prisma.product.findUnique({where: {id: item.id}})
      const storeId = product.storeId;
      if(!ordersByStore.has(storeId)){
        ordersByStore.set(storeId, [])
      }
      ordersByStore.get(storeId).push({...item, price: product.price})
    }
    let orderIds = [];
    let fullAmount = 0;

    let isShippingFeeAdded = false;

    // create orders for each seller
    for(const [storeId, sellerItems] of ordersByStore.entries()){
      let total = sellerItems.reduce((acc, item)=>acc + (item.price * item.quantity), 0)

      if(couponCode){
        total -= (total * coupon.discount) / 100
      }

      if(!isPlusMember && !isShippingFeeAdded){
        total += 5;
        isShippingFeeAdded = true
      }

      fullAmount += parseFloat(total.toFixed(2))
// 6:23:15
      const order = await prisma.order.create({data: {}})
    }
  } catch (error) {}
}
