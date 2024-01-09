import { gql } from '@apollo/client';

export const GET_SERVER_BY_PROFILE_ID = gql`
  query getServerByProfileId($profileId: String!) {
    getServerByProfileId(profileId: $profileId) {
      id
    }
  }
`;
