import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

interface Params {
  params: {
    id: string;
  };
}

// GET a single user by ID
export async function GET(request: Request, { params }: Params) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(`Error fetching user ${params.id}:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// UPDATE a user by ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const updateData: { name?: string; email?: string; password?: string } = {};

    if (name) {
      updateData.name = name;
    }
    if (email) {
      updateData.email = email;
    }
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

     if (Object.keys(updateData).length === 0) {
      return new NextResponse('No data provided for update', { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(`Error updating user ${params.id}:`, error);
    // Check for specific Prisma error for record not found
    if ((error as any).code === 'P2025') {
        return new NextResponse('User not found', { status: 404 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// DELETE a user by ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(`Error deleting user ${params.id}:`, error);
     // Check for specific Prisma error for record not found
    if ((error as any).code === 'P2025') {
        return new NextResponse('User not found', { status: 404 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
