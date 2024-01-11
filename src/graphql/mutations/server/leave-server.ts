import { gql } from '@apollo/client';

export const LEAVE_SERVER = gql`
  mutation leaveServer($id: String!) {
    leaveServer(id: $id) {
      id
    }
  }
`;
