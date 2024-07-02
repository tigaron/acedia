import { useAuth } from '@clerk/nextjs';

import { db } from '@/lib/db';

export async function currentProfile() {
  const { userId } = useAuth();

  if (!userId) return null;

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
}
