import { gql } from '@apollo/client';

export const UPDATE_CHANNEL = gql`
  mutation updateChannel($input: UpdateChannelDto!) {
    updateChannel(input: $input) {
      id
      name
      imageUrl
      inviteCode
      profileId
    }
  }
`;
