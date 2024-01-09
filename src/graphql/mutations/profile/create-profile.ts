import { gql } from '@apollo/client';

export const CREATE_PROFILE = gql`
  mutation createProfile($input: CreateProfileDto!) {
    createProfile(input: $input) {
      id
    }
  }
`;
