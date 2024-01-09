import { gql } from '@apollo/client';

export const GET_SERVER_WITH_CHANNEL_MEMBER_PROFILE_BY_ID = gql`
  query getServerWithChannelMemberProfileById(
    $id: String!
    $profileId: String!
  ) {
    getServerWithChannelMemberProfileById(id: $id, profileId: $profileId) {
      id
      name
      imageUrl
      inviteCode
      profileId
      members {
        id
        role
        profileId
        serverId
        profile {
          id
          userId
          name
          email
          imageUrl
        }
      }
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
