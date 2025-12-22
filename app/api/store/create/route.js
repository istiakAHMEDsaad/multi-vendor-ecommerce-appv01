import prisma from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    // get the form data
    const formData = await request.formData();

    const name = formData.get('name');
    const username = formData.get('username');
    const description = formData.get('description');
    const email = formData.get('email');
    const contact = formData.get('contact');
    const address = formData.get('address');
    const image = formData.get('image');

    // check all data on the form
    if (
      !name ||
      !username ||
      !description ||
      !email ||
      !contact ||
      !address ||
      !image
    ) {
      return NextResponse.json(
        { error: 'Missing store info!' },
        { status: 400 }
      );
    }

    // check user have already registered a store:
    const store = await prisma.store.findFirst({ where: { userId: userId } });

    // if store already registered then send status of store:
    if (store) {
      return NextResponse.json({ status: store.status });
    }

    // check is username already taken:
    const isUserNameTaken = await prisma.store.findFirst({
      where: { username: username.toLowerCase() },
    });

    if (isUserNameTaken) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 400 }
      );
    }
  } catch (error) {}
}
