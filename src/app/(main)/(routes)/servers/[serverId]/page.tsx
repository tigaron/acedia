import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Server } from '@/graphql/gql/graphql';

import { createApolloClient } from '@/lib/apollo-client';
import { currentProfile } from '@/lib/current-profile';

import { GET_SERVER_WITH_CHANNEL_BY_ID } from '@/graphql/queries/server/get-server-with-channel-by-id';

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}

export default async function ServerIdPage({ params }: ServerIdPageProps) {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const { getToken } = auth();

  const token = await getToken({ template: 'acedia' });

  const client = createApolloClient(token);

  const { data: serverQueryData } = await client.query({
    query: GET_SERVER_WITH_CHANNEL_BY_ID,
    variables: {
      id: params.serverId,
      profileId: profile.id,
    },
  });

  const server: Server = serverQueryData?.getServerWithChannelById;

  if (!server) return redirect('/');

  const initialChannel = server.channels[0];

  if (initialChannel?.name !== 'general') return null;

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
}
