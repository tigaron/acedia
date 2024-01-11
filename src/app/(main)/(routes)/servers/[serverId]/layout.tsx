import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { GetServerByIdQueryVariables, Server } from '@/graphql/gql/graphql';

import { createApolloClient } from '@/lib/apollo-client';
import { currentProfile } from '@/lib/current-profile';

import { GET_SERVER_BY_ID } from '@/graphql/queries/server/get-server-by-id';

import { ServerSidebar } from '@/components/server/server-sidebar';

export default async function ServerIdLayoutasync({
  children,
  params,
}: {
  children: ReactNode;
  params: { serverId: string };
}) {
  const profile = await currentProfile();

  if (!profile)
    return redirectToSignIn({ returnBackUrl: `/servers/${params.serverId}` });

  const { getToken } = auth();

  const token = await getToken({ template: 'acedia' });

  const client = createApolloClient(token);

  const variables: GetServerByIdQueryVariables = {
    id: params.serverId,
    profileId: profile.id,
  };

  const { data: serverQueryData } = await client.query({
    query: GET_SERVER_BY_ID,
    variables,
  });

  const server: Server = serverQueryData?.getServerById;

  if (!server) return redirect('/');

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={server.id} />
      </div>

      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
