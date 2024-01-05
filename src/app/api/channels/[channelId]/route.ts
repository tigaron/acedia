import { NextResponse } from 'next/server';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    if (!params.channelId)
      return new NextResponse('Channel ID is required', { status: 400 });

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
            role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] },
          },
        },
      },
      data: {
        channels: {
          delete: { id: params.channelId, name: { not: 'general' } },
        },
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error('[Channels_ChannelId][DELETE]', error);
    return new NextResponse(
      (error as Error).message || 'Internal Server Error',
      {
        status: 500,
      },
    );
  }
}
