import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import {
  Conversation,
  FetchConversationQueryVariables,
  GetMemberByServerIdQueryVariables,
  Member,
} from '@/graphql/gql/graphql';

import { createApolloClient } from '@/lib/apollo-client';
import { currentProfile } from '@/lib/current-profile';

import { ChatHeader } from '@/components/chat/chat-header';

import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { FETCH_CONVERSATION } from '@/graphql/queries/conversation/fetch-conversation';
import { GET_MEMBER_BY_SERVER_ID } from '@/graphql/queries/member/get-member-by-server-id';

interface MemberIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  };
}

export default async function MemberIdPage({ params }: MemberIdPageProps) {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const { getToken } = auth();

  const token = await getToken({ template: 'acedia' });

  const client = createApolloClient(token);

  const memberVariables: GetMemberByServerIdQueryVariables = {
    serverId: params.serverId,
    profileId: profile.id,
  };

  const { data: memberQueryData } = await client.query({
    query: GET_MEMBER_BY_SERVER_ID,
    variables: memberVariables,
  });

  const currentMember: Member = memberQueryData?.getMemberByServerId;

  if (!currentMember) return redirect(`/servers/${params.serverId}`);

  const conversationVariables: FetchConversationQueryVariables = {
    memberOneId: currentMember.id,
    memberTwoId: params.memberId,
  };

  const { data: conversationQueryData } = await client.query({
    query: FETCH_CONVERSATION,
    variables: conversationVariables,
  });

  const conversation: Conversation = conversationQueryData?.fetchConversation;

  if (!conversation) return redirect(`/servers/${params.serverId}`);

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={params.serverId}
        name={otherMember.profile.name}
        imageUrl={otherMember.profile.imageUrl}
        type="conversation"
      />
      <ChatMessages
        member={currentMember}
        name={otherMember.profile.name}
        chatId={conversation.id}
        type="conversation"
        paramKey="conversationId"
        paramValue={conversation.id}
        token={token as string}
      />
      <ChatInput
        name={otherMember.profile.name}
        type="conversation"
        query={{
          conversationId: conversation.id,
        }}
      />
    </div>
  );
}
