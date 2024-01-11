import { gql } from '@apollo/client';

export const DELETE_MESSAGE = gql`
  mutation deleteMessage($input: DeleteMessageDto!) {
    deleteMessage(input: $input) {
      id
    }
  }
`;
