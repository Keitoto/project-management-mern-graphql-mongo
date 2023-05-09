import { gql } from '@apollo/client';

export const GET_CLIENT_LIST = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;
