import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface InviteCodePageProps {
  params: { inviteCode: string };
}

const getServer = async (inviteCode: string, profileId: string) => {
  const server = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId,
        },
      },
    },
  });

  return server;
};

const addMember = async (inviteCode: string, profileId: string) => {
  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: {
          profileId,
        },
      },
    },
  });

  return server;
};

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  if (!params.inviteCode) return redirect('/');

  const existingServer = await getServer(params.inviteCode, profile.id);

  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  const server = await addMember(params.inviteCode, profile.id);

  if (server) return redirect(`/servers/${server.id}`);

  return null;
};

export default InviteCodePage;
