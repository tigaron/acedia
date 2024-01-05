import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    if (!params.serverId)
      return new NextResponse('Server ID is required', { status: 400 });

    const profile = await currentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error('[Servers_ServerId_InviteCode][PATCH]', error);
    return new NextResponse(
      (error as Error).message || 'Internal Server Error',
      {
        status: 500,
      },
    );
  }
}
