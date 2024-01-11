import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import {
  GetServerByProfileIdQueryVariables,
  Server,
} from '@/graphql/gql/graphql';

import { createApolloClient } from '@/lib/apollo-client';
import { initialProfile } from '@/lib/initial-profile';

import { GET_SERVER_BY_PROFILE_ID } from '@/graphql/queries/server/get-server-by-profile-id';

import { InitialServerModal } from '@/components/modals/initial-server-modal';

export default async function OnBoardingPage() {
  const profile = await initialProfile();

  const { getToken } = auth();

  const token = await getToken({ template: 'acedia' });

  const client = createApolloClient(token);

  const variables: GetServerByProfileIdQueryVariables = {
    profileId: profile.id,
  };

  const { data: serverQueryData } = await client.query({
    query: GET_SERVER_BY_PROFILE_ID,
    variables,
  });

  const server: Server = serverQueryData?.getServerByProfileId;

  if (server) return redirect(`/servers/${server.id}`);

  return <InitialServerModal />;
}
