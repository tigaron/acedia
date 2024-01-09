import { gql } from '@apollo/client';

export const UPDATE_MEMBER_ROLE = gql`
  mutation updateMemberRole($input: UpdateMemberRoleDto!) {
    updateMemberRole(input: $input) {
      id
      name
      imageUrl
      inviteCode
      profileId
      members {
        id
        role
        profileId
        profile {
          id
          userId
          name
          email
          imageUrl
        }
        serverId
      }
    }
  }
`;
