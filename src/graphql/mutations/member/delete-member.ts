import { gql } from '@apollo/client';

export const DELETE_MEMBER = gql`
  mutation deleteMember($input: DeleteMemberDto!) {
    deleteMember(input: $input) {
      id
      profileId
      members {
        id
        role
        profileId
        profile {
          name
          email
          imageUrl
        }
      }
    }
  }
`;
