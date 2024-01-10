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
        profile {
          name
          email
          imageUrl
        }
      }
      channels {
        id
        name
        type
      }
    }
  }
`;
