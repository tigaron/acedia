import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';

import { InitialServerModal } from '@/components/modals/initial-server-modal';

export default async function OnBoardingPage() {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);

  return <InitialServerModal />;
}
