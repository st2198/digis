import { gql } from "@apollo/client";

export const LOO_QUERY = gql`query LooQuery($page: Int!) {
    loos(filters: {active: true}, pagination: {limit: 10, page: $page}) {
        loos {
            id
            name
            accessible
            allGender
            men
            women
        }
    }
}`

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