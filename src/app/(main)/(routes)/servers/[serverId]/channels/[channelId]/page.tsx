import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import {
  Channel,
  GetChannelByIdQueryVariables,
  GetMemberByServerIdQueryVariables,
  Member,
} from '@/graphql/gql/graphql';

import { createApolloClient } from '@/lib/apollo-client';
import { currentProfile } from '@/lib/current-profile';

import { GET_CHANNEL_BY_ID } from '@/graphql/queries/channel/get-channel-by-id';
import { GET_MEMBER_BY_SERVER_ID } from '@/graphql/queries/member/get-member-by-server-id';

import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

export default async function ChannelIdPage({ params }: ChannelIdPageProps) {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const { getToken } = auth();

  const token = await getToken({ template: 'acedia' });

  const client = createApolloClient(token);

  const channelVariables: GetChannelByIdQueryVariables = {
    id: params.channelId,
  };

  const { data: channelQueryData } = await client.query({
    query: GET_CHANNEL_BY_ID,
    variables: channelVariables,
  });

  const channel: Channel = channelQueryData.getChannelById;

  if (!channel) return redirect(`/servers/${params.serverId}`);

  const memberVariables: GetMemberByServerIdQueryVariables = {
    serverId: params.serverId,
    profileId: profile.id,
  };

  const { data: memberQueryData } = await client.query({
    query: GET_MEMBER_BY_SERVER_ID,
    variables: memberVariables,
  });

  const member: Member = memberQueryData.getMemberByServerId;

  if (!member) return redirect(`/servers/${params.serverId}`);

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={channel.serverId}
        name={channel.name}
        type={channel.type}
      />
      <ChatMessages
        member={member}
        name={channel.name}
        chatId={channel.id}
        token={token as string}
        type="channel"
        paramKey="channelId"
        paramValue={channel.id}
      />
      <ChatInput
        name={channel.name}
        type="channel"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
          memberId: member.id,
        }}
      />
    </div>
  );
}
