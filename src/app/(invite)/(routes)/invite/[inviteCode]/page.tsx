import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Server } from '@/graphql/gql/graphql';

import { createApolloClient } from '@/lib/apollo-client';
import { currentProfile } from '@/lib/current-profile';

import { CREATE_MEMBER } from '@/graphql/mutations/member/create-member';
import { GET_SERVER_BY_INVITE_CODE } from '@/graphql/queries/server/get-server-by-invite-code';

interface InviteCodePageProps {
  params: { inviteCode: string };
}

export default async function InviteCodePage({ params }: InviteCodePageProps) {
  const profile = await currentProfile();

  if (!profile)
    return redirectToSignIn({ returnBackUrl: `/invite/${params.inviteCode}` });

  if (!params.inviteCode) return redirect('/');

  const { getToken } = auth();

  const token = await getToken({ template: 'acedia' });

  const client = createApolloClient(token);

  const { data: serverQueryData } = await client.query({
    query: GET_SERVER_BY_INVITE_CODE,
    variables: {
      inviteCode: params.inviteCode,
      profileId: profile.id,
    },
  });

  const existingServer: Server = serverQueryData?.serverByInviteCode;

  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  const { data: serverMutationData } = await client.mutate({
    mutation: CREATE_MEMBER,
    variables: {
      input: {
        inviteCode: params.inviteCode,
        profileId: profile.id,
      },
    },
  });

  const server: Server = serverMutationData?.createMember;

  if (server) return redirect(`/servers/${server.id}`);

  return null;
}
