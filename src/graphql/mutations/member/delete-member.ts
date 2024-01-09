import { gql } from '@apollo/client';

export const DELETE_MEMBER = gql`
  mutation deleteMember($input: DeleteMemberDto!) {
    deleteMember(input: $input) {
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
