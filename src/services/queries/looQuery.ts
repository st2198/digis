import { gql } from "@apollo/client";

export const LOO_QUERY = gql`
  query LooQuery($page: Int!, $active: Boolean!) {
    loos(filters: {active: $active}, pagination: {limit: 10, page: $page}) {
      loos {
        id
        name
        accessible
        allGender
        men
        women
      }
    }
  }
`;

export const LOO_BY_ID_QUERY = gql`
  query LooQuery($id: ID!) {
    loo(id: $id) {
      id
      name
      accessible
      allGender
      men
      women
    }
  }
`;

export const TEST_Q = gql`
query ExampleQuery($page: Int) {
  characters(page: $page) {
    results {
      gender
      id
      name
    }
  }
}
`;