import imagekit from '@/configs/imageKit';
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

    // image upload to imagekit
    const buffer = Buffer.from(await image.arrayBuffer());
    const response = await imagekit.upload({
      file: buffer,
      fileName: image.name,
      folder: 'logos',
    });

    const optimizedImage = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },
        { format: 'webp' },
        { width: '512' },
      ],
    });

    const newStore = await prisma.store.create({
      data: {
        userId,
        name,
        description,
        username: username.toLowerCase(),
        email,
        contact,
        address,
        logo: optimizedImage,
      },
    });

    // Link store to user
    await prisma.user.update({
      where: { id: userId },
      data: { store: { connect: { id: newStore.id } } },
    });

    return NextResponse.json({ message: 'Applied, wating for approval' });
  } catch (error) {
    console.error(error.error);
    NextResponse.json({ error: error.code || error.message }, { status: 400 });
  }
}

