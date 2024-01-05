import { NextResponse } from 'next/server';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    if (!params.memberId)
      return new NextResponse('Member ID is required', { status: 400 });

    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');

    if (!serverId)
      return new NextResponse('Server ID is required', { status: 400 });

    const { role } = await req.json();

    if (!role) return new NextResponse('Role is required', { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error('[Members_MemberId][PATCH]', error);
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
  { params }: { params: { memberId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    if (!params.memberId)
      return new NextResponse('Member ID is required', { status: 400 });

    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');

    if (!serverId)
      return new NextResponse('Server ID is required', { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          delete: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error('[Members_MemberId][DELETE]', error);
    return new NextResponse(
      (error as Error).message || 'Internal Server Error',
      {
        status: 500,
      },
    );
  }
}
