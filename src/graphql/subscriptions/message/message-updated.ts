import { gql } from '@apollo/client';

export const MESSAGE_UPDATED = gql`
  subscription messageUpdated($channelId: String!) {
    messageUpdated(channelId: $channelId) {
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
