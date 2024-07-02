import { useAuth } from '@clerk/nextjs';

import { db } from '@/lib/db';

export async function currentProfile() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userId } = useAuth();

  if (!userId) return null;

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
}
