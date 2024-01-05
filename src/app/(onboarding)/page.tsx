import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';

import { InitialServerModal } from '@/components/modals/initial-server-modal';

const getAnyServer = async (profileId: string) => {
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId,
        },
      },
    },
  });

  return server;
};

const OnBoardingPage = async () => {
  const profile = await initialProfile();

  const server = await getAnyServer(profile.id);

  if (server) return redirect(`/servers/${server.id}`);

  return <InitialServerModal />;
};

export default OnBoardingPage;
