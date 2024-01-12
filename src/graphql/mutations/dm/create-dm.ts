import { gql } from '@apollo/client';

export const CREATE_DM = gql`
  mutation createDM($input: CreateDMDto!) {
    createDM(input: $input) {
      id
    }
  }
`;
