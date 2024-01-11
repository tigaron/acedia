import { auth, redirectToSignIn } from '@clerk/nextjs';
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react';
import { redirect } from 'next/navigation';

import {
  ChannelTypeEnum,
  GetServerWithChannelMemberProfileByIdQueryVariables,
  MemberRoleEnum,
  Server,
} from '@/graphql/gql/graphql';

import { createApolloClient } from '@/lib/apollo-client';
import { currentProfile } from '@/lib/current-profile';

import { GET_SERVER_WITH_CHANNEL_MEMBER_PROFILE_BY_ID } from '@/graphql/queries/server/get-server-with-channel-member-profile-by-id';

import { ServerMember } from '@/components/server//server-member';
import { ServerChannel } from '@/components/server/server-channel';
import { ServerHeader } from '@/components/server/server-header';
import { ServerSearch } from '@/components/server/server-search';
import { ServerSection } from '@/components/server/server-section';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface ServerSidebarProps {
  serverId: string;
}

const channelIconMap = {
  [ChannelTypeEnum.Text]: <Hash className="mr-2 w-4 h-4" />,
  [ChannelTypeEnum.Audio]: <Mic className="mr-2 w-4 h-4" />,
  [ChannelTypeEnum.Video]: <Video className="mr-2 w-4 h-4" />,
};

const roleIconMap = {
  [MemberRoleEnum.Guest]: null,
  [MemberRoleEnum.Moderator]: (
    <ShieldCheck className="mr-2 w-4 h-4 text-indigo-500" />
  ),
  [MemberRoleEnum.Admin]: (
    <ShieldAlert className="mr-2 w-4 h-4 text-rose-500" />
  ),
};

export async function ServerSidebar({ serverId }: ServerSidebarProps) {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const { getToken } = auth();

  const token = await getToken({ template: 'acedia' });

  const client = createApolloClient(token);

  const variables: GetServerWithChannelMemberProfileByIdQueryVariables = {
    id: serverId,
    profileId: profile.id,
  };

  const { data: serverQueryData } = await client.query({
    query: GET_SERVER_WITH_CHANNEL_MEMBER_PROFILE_BY_ID,
    variables,
  });

  const server: Server = serverQueryData?.getServerWithChannelMemberProfileById;

  if (!server) return redirect('/');

  const textChannels = server.channels.filter(
    channel => channel.type === ChannelTypeEnum.Text,
  );

  const audioChannels = server.channels.filter(
    channel => channel.type === ChannelTypeEnum.Audio,
  );

  const videoChannels = server.channels.filter(
    channel => channel.type === ChannelTypeEnum.Video,
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
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels.map(channel => ({
                  icon: channelIconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: 'Voice Channels',
                type: 'channel',
                data: audioChannels.map(channel => ({
                  icon: channelIconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: 'Video Channels',
                type: 'channel',
                data: videoChannels.map(channel => ({
                  icon: channelIconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members.map(member => ({
                  icon: roleIconMap[member.role],
                  name: member.profile.name,
                  id: member.id,
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelTypeEnum.Text}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelTypeEnum.Audio}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelTypeEnum.Video}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map(member => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
