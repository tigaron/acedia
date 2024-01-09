import { gql } from '@apollo/client';

export const UPDATE_SERVER = gql`
  mutation updateServer($input: UpdateServerDto!) {
    updateServer(input: $input) {
      id
    }
  }
`;
