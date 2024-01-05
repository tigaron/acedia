import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { ChannelType } from '@prisma/client';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

import { ServerHeader } from '@/components/server/server-header';

interface ServerSidebarProps {
  serverId: string;
}

const getServerChannels = async (serverId: string, profileId: string) => {
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
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

  return server;
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const server = await getServerChannels(serverId, profile.id);

  if (!server) return redirect('/');

  const textChannels = server.channels.filter(
    channel => channel.type === ChannelType.TEXT,
  );
  const audioChannels = server.channels.filter(
    channel => channel.type === ChannelType.AUDIO,
  );
  const videoChannels = server.channels.filter(
    channel => channel.type === ChannelType.VIDEO,
  );

  const members = server.members.filter(
    member => member.profileId !== profile.id,
  );

  const role = server.members.find(
    member => member.profileId === profile.id,
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};
