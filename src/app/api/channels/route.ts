import { NextResponse } from 'next/server';

import { MemberRole } from '@prisma/client';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    const { name, type } = await req.json();

    if (!name) return new NextResponse('Name is required', { status: 400 });

    if (name === 'general')
      return new NextResponse('Name cannot be general', { status: 409 });

    if (!type) return new NextResponse('Type is required', { status: 400 });

    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');

    if (!serverId)
      return new NextResponse('Server ID is required', { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: [
            {
              name,
              type,
              profileId: profile.id,
            },
          ],
        },
      },
    });

    return NextResponse.json(server, { status: 201 });
  } catch (error) {
    console.error('[Channels][POST]', error);
    return new NextResponse(
      (error as Error).message || 'Internal Server Error',
      {
        status: 500,
      },
    );
  }
}
