import { gql } from '@apollo/client';

export const GET_SERVER_BY_ID = gql`
  query getServerById($id: String!, $profileId: String!) {
    getServerById(id: $id, profileId: $profileId) {
      id
      name
      imageUrl
      inviteCode
      profileId
    }
  }
`;
