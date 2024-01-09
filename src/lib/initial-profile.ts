import { auth, currentUser, redirectToSignIn } from '@clerk/nextjs';

import { Profile } from '@/graphql/gql/graphql';

import { createApolloClient } from '@/lib/apollo-client';

import { CREATE_PROFILE } from '@/graphql/mutations/profile/create-profile';
import { GET_PROFILE_BY_USER_ID } from '@/graphql/queries/profile/get-profile-by-user-id';

export async function initialProfile(): Promise<Profile> {
  const user = await currentUser();

  if (!user) return redirectToSignIn();

  const { getToken } = auth();

  const token = await getToken({ template: 'acedia' });

  const client = createApolloClient(token);

  const { data: profileQueryData } = await client.query({
    query: GET_PROFILE_BY_USER_ID,
    variables: { userId: user.id },
  });

  const profile: Profile = profileQueryData?.getProfileByUserId;

  if (profile) return profile;

  const { data: profileMutationData } = await client.mutate({
    mutation: CREATE_PROFILE,
    variables: {
      input: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    },
  });

  const newProfile: Profile = profileMutationData?.createProfile;

  return newProfile;
}
