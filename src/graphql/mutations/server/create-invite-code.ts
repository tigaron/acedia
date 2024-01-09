import { gql } from '@apollo/client';

export const CREATE_INVITE_CODE = gql`
  mutation createInviteCode($input: CreateInviteCodeDto!) {
    createInviteCode(input: $input) {
      id
      inviteCode
    }
  }
`;
