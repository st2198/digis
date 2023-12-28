import { gql } from "@apollo/client";

export const CHARACTERS_QUERY = gql`
  query Characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        gender
        id
        name
      }
    }
  }
`;

export const CHARACTER_QUERY = gql`
  query Character($characterId: ID!) {
    character(id: $characterId) {
      id
      name
      gender
      status
      species
    }
  }
`