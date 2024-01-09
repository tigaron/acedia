import { gql } from '@apollo/client';

export const GET_SERVER_BY_INVITE_CODE = gql`
  query getServerByInviteCode($inviteCode: String!, $profileId: String!) {
    getServerByInviteCode(inviteCode: $inviteCode, profileId: $profileId) {
      id
    }
  }
`;
