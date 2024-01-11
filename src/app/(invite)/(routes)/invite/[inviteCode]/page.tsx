import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import {
  CreateMemberMutationVariables,
  GetServerByInviteCodeQueryVariables,
  Server,
} from '@/graphql/gql/graphql';

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

  const queryVariables: GetServerByInviteCodeQueryVariables = {
    inviteCode: params.inviteCode,
    profileId: profile.id,
  };

  const { data: serverQueryData } = await client.query({
    query: GET_SERVER_BY_INVITE_CODE,
    variables: queryVariables,
  });

  const existingServer: Server = serverQueryData?.serverByInviteCode;

  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  const mutationVariables: CreateMemberMutationVariables = {
    inviteCode: params.inviteCode,
  };

  const { data: serverMutationData } = await client.mutate({
    mutation: CREATE_MEMBER,
    variables: mutationVariables,
  });

  const server: Server = serverMutationData?.createMember;

  if (server) return redirect(`/servers/${server.id}`);

  return null;
}
