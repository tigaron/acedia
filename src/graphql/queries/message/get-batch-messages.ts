import { gql } from '@apollo/client';

export const GET_BATCH_MESSAGES = gql`
  query getBatchMessages($channelId: String!, $cursor: String) {
    getBatchMessages(channelId: $channelId, cursor: $cursor) {
      messages {
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
      nextCursor
    }
  }
`;
