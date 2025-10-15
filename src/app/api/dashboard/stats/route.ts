import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [usersCount, vistosCount, blogPostsCount, contactsCount, leadsCount] = await Promise.all([
      prisma.user.count(),
      prisma.visto.count(),
      prisma.blogPost.count(),
      prisma.contact.count(),
      prisma.lead.count()
    ]);

    return NextResponse.json({
      usersCount,
      vistosCount,
      blogPostsCount,
      contactsCount,
      leadsCount
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
