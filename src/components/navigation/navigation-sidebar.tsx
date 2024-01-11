import { UserButton, auth, redirectToSignIn } from '@clerk/nextjs';

import {
  GetAllServersByProfileIdQueryVariables,
  Server,
} from '@/graphql/gql/graphql';
import { createApolloClient } from '@/lib/apollo-client';
import { currentProfile } from '@/lib/current-profile';

import { GET_ALL_SERVERS_BY_PROFILE_ID } from '@/graphql/queries/server/get-all-servers-by-profile-id';

import { NavigationAction } from '@/components/navigation/navigation-action';
import { NavigationItem } from '@/components/navigation/navigation-item';
import { ThemeToggle } from '@/components/theme-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export async function NavigationSidebar() {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const { getToken } = auth();

  const token = await getToken({ template: 'acedia' });

  const client = createApolloClient(token);

  const variables: GetAllServersByProfileIdQueryVariables = {
    profileId: profile.id,
  };

  const { data: serversQueryData } = await client.query({
    query: GET_ALL_SERVERS_BY_PROFILE_ID,
    variables,
  });

  const servers: Server[] = serversQueryData?.getAllServersByProfileId;

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map(server => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ThemeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px]',
            },
          }}
        />
      </div>
    </div>
  );
}
