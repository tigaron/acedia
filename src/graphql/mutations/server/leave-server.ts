import { gql } from '@apollo/client';

export const LEAVE_SERVER = gql`
  mutation leaveServer($input: LeaveServerDto!) {
    leaveServer(input: $input) {
      id
    }
  }
`;
