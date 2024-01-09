import { gql } from '@apollo/client';

export const UPDATE_MEMBER_ROLE = gql`
  mutation updateMemberRole($input: UpdateMemberRoleDto!) {
    updateMemberRole(input: $input) {
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
