import { gql } from '@apollo/client';

export const CREATE_MEMBER = gql`
  mutation createMember($inviteCode: String!) {
    createMember(inviteCode: $inviteCode) {
      id
    }
  }
`;
