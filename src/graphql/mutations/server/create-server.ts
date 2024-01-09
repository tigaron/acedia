import { gql } from '@apollo/client';

export const CREATE_SERVER = gql`
  mutation createServer($input: CreateServerDto!) {
    createServer(input: $input) {
      id
    }
  }
`;
