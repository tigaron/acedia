import { gql } from '@apollo/client';

export const UPDATE_MESSAGE = gql`
  mutation updateMessage($input: UpdateMessageDto!) {
    updateMessage(input: $input) {
      id
    }
  }
`;
