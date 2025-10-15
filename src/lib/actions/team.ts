import { prisma } from '@/lib/prisma';

export type TeamMemberData = {
  id: string;
  name: string;
  slug: string;
  position: string;
  bio?: string;
  imageUrl?: string;
  email?: string;
  linkedin?: string;
  order: number;
};

export async function getPublishedTeamMembers(): Promise<TeamMemberData[]> {
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

    return teamMembers.map(member => ({
      id: member.id,
      name: member.name,
      slug: member.slug,
      position: member.position,
      bio: member.bio || undefined,
      imageUrl: member.imageUrl || undefined,
      email: member.email || undefined,
      linkedin: member.linkedin || undefined,
      order: member.order
    }));
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}
