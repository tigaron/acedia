import { gql } from '@apollo/client';

export const MESSAGE_CREATED = gql`
  subscription messageCreated($channelId: String!) {
    messageCreated(channelId: $channelId) {
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
