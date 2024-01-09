import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest } from 'next';

import { Profile } from '@/graphql/gql/graphql';

import { createApolloClient } from '@/lib/apollo-client';

import { GET_PROFILE_BY_USER_ID } from '@/graphql/queries/profile/get-profile-by-user-id';

export async function currentProfilePages(req: NextApiRequest) {
  const { userId, getToken } = getAuth(req);

  if (!userId) return null;

  const token = await getToken({ template: 'acedia' });

  const client = createApolloClient(token);

  const { data: profileQueryData } = await client.query({
    query: GET_PROFILE_BY_USER_ID,
    variables: { userId },
  });

  const profile: Profile = profileQueryData?.getProfileByUserId;

  return profile;
}
