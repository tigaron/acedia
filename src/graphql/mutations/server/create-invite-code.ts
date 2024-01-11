import { gql } from '@apollo/client';

export const CREATE_INVITE_CODE = gql`
  mutation createInviteCode($id: String!) {
    createInviteCode(id: $id) {
      id
      inviteCode
    }
  }
`;
