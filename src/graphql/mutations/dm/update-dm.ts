import { gql } from '@apollo/client';

export const UPDATE_DM = gql`
  mutation updateDM($input: UpdateDMDto!) {
    updateDM(input: $input) {
      id
    }
  }
`;
