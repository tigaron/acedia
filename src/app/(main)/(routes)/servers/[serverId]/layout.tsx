import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

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

  const server = await db.server.findUnique({
    where: {
      id: params?.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

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
