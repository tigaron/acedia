import { gql } from '@apollo/client';

export const CREATE_MEMBER = gql`
  mutation createMember($input: CreateMemberDto!) {
    createMember(input: $input) {
      id
      name
      imageUrl
      inviteCode
      profileId
    }
  }
`;
