import { gql } from '@apollo/client';

export const GET_BATCH_DMS = gql`
  query getBatchDMs($conversationId: String!, $cursor: String) {
    getBatchDMs(conversationId: $conversationId, cursor: $cursor) {
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
