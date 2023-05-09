import { gql } from '@apollo/client';

export const GET_PROJECT_LIST = gql`
  query getProjectList {
    projects {
      id
      name
      status
    }
  }
`;

export const GET_PROJECT_DETAIL = gql`
  query getProjectDetail($id: ID!) {
    project(id: $id) {
      id
      clientId
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
