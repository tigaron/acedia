import { gql } from '@apollo/client';

export const FETCH_CONVERSATION = gql`
  query fetchConversation($memberOneId: String!, $memberTwoId: String!) {
    fetchConversation(memberOneId: $memberOneId, memberTwoId: $memberTwoId) {
      id
      memberOne {
        profileId
        profile {
          name
          imageUrl
        }
      }
      memberTwo {
        profileId
        profile {
          name
          imageUrl
        }
      }
    }
  }
`;
