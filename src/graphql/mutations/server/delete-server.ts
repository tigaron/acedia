import { gql } from '@apollo/client';

export const DELETE_SERVER = gql`
  mutation deleteServer($id: String!) {
    deleteServer(id: $id) {
      id
    }
  }
`;
