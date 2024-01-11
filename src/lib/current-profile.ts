import { auth } from '@clerk/nextjs';

import {
  GetProfileByUserIdQueryVariables,
  Profile,
} from '@/graphql/gql/graphql';

import { createApolloClient } from '@/lib/apollo-client';

import { GET_PROFILE_BY_USER_ID } from '@/graphql/queries/profile/get-profile-by-user-id';

export async function currentProfile(): Promise<Profile | null> {
  const { userId, getToken } = auth();

  if (!userId) return null;

  const token = await getToken({ template: 'acedia' });

  const client = createApolloClient(token);

  const variables: GetProfileByUserIdQueryVariables = {
    userId,
  };

  const { data: profileQueryData } = await client.query({
    query: GET_PROFILE_BY_USER_ID,
    variables,
  });

  const profile: Profile = profileQueryData?.getProfileByUserId;

  return profile;
}
