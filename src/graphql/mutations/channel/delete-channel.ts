import { gql } from '@apollo/client';

export const DELETE_CHANNEL = gql`
  mutation deleteChannel($input: DeleteChannelDto!) {
    deleteChannel(input: $input) {
      id
    }
  }
`;
