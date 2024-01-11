import { gql } from '@apollo/client';

export const MESSAGE_DELETED = gql`
  subscription messageDeleted($channelId: String!) {
    messageDeleted(channelId: $channelId) {
      id
      content
      fileUrl
      deleted
      createdAt
      updatedAt
      member {
        id
        role
        profile {
          name
          imageUrl
        }
      }
    }
  }
`;
