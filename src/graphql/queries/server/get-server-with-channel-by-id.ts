import { gql } from '@apollo/client';

export const GET_SERVER_WITH_CHANNEL_BY_ID = gql`
  query getServerWithChannelById($id: String!, $profileId: String!) {
    getServerWithChannelById(id: $id, profileId: $profileId) {
      id
      name
      imageUrl
      inviteCode
      profileId
      channels {
        id
        name
        type
        profileId
        serverId
      }
    }
  }
`;
