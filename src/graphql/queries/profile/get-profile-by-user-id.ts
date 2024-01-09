import { gql } from '@apollo/client';

export const GET_PROFILE_BY_USER_ID = gql`
  query getProfileByUserId($userId: String!) {
    getProfileByUserId(userId: $userId) {
      id
    }
  }
`;
