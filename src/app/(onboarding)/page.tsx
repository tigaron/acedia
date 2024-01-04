import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';

import { CreateServerModal } from '@/components/modals/create-server';

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

  return <CreateServerModal />;
};

export default OnBoardingPage;
