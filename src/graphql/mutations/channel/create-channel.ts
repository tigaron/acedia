import { gql } from '@apollo/client';

export const CREATE_CHANNEL = gql`
  mutation createChannel($input: CreateChannelDto!) {
    createChannel(input: $input) {
      id
      name
      imageUrl
      inviteCode
      profileId
    }
  }
`;
