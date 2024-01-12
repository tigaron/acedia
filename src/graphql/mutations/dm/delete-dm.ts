import { gql } from '@apollo/client';

export const DELETE_DM = gql`
  mutation deleteDM($input: DeleteDMDto!) {
    deleteDM(input: $input) {
      id
    }
  }
`;
