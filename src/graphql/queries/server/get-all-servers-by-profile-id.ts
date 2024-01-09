import { gql } from '@apollo/client';

export const GET_ALL_SERVERS_BY_PROFILE_ID = gql`
  query getAllServersByProfileId($profileId: String!) {
    getAllServersByProfileId(profileId: $profileId) {
      id
      name
      imageUrl
    }
  }
`;
