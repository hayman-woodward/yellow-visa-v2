import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        status: 'published'
      },
      orderBy: {
        order: 'asc'
      },
      select: {
        id: true,
        name: true,
        slug: true,
        position: true,
        bio: true,
        imageUrl: true,
        email: true,
        linkedin: true,
        order: true
      }
    });

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}
