import { gql } from '@apollo/client';

export const GET_MEMBER_BY_SERVER_ID = gql`
  query getMemberByServerId($serverId: String!, $profileId: String!) {
    getMemberByServerId(serverId: $serverId, profileId: $profileId) {
      id
      role
      serverId
      profileId
    }
  }
`;
