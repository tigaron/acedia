import { gql } from '@apollo/client';

export const CREATE_MESSAGE = gql`
  mutation createMessage($input: CreateMessageDto!) {
    createMessage(input: $input) {
      id
    }
  }
`;
