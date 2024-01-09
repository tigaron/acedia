import { gql } from '@apollo/client';

export const GET_CHANNEL_BY_ID = gql`
  query getChannelById($id: String!) {
    getChannelById(id: $id) {
      id
      name
      type
      serverId
    }
  }
`;
