import { gql } from '@apollo/client';

export const DELETE_SERVER = gql`
  mutation deleteServer($input: DeleteServerDto!) {
    deleteServer(input: $input) {
      id
      name
      imageUrl
      inviteCode
      profileId
    }
  }
`;
