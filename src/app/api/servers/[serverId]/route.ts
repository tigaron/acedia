import { NextResponse } from 'next/server';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    if (!params.serverId)
      return new NextResponse('Server ID is required', { status: 400 });

    const { name, imageUrl } = await req.json();

    if (!name) return new NextResponse('Name is required', { status: 400 });

    if (!imageUrl)
      return new NextResponse('Image URL is required', { status: 400 });

    const server = await db.server.update({
      where: { id: params.serverId, profileId: profile.id },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error('[Servers_ServerId][PATCH]', error);
    return new NextResponse(
      (error as Error).message || 'Internal Server Error',
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    if (!params.serverId)
      return new NextResponse('Server ID is required', { status: 400 });

    const server = await db.server.delete({
      where: { id: params.serverId, profileId: profile.id },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error('[Servers_ServerId][DELETE]', error);
    return new NextResponse(
      (error as Error).message || 'Internal Server Error',
      {
        status: 500,
      },
    );
  }
}
