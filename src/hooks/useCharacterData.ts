import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CHARACTERS_QUERY, CHARACTER_QUERY } from "@/services/queries/characterQuery";
import { Character } from "@/services/types";

export function useCharacterData(currentPage: number, status: string, characterId: string) {
  const { data: charactersData } = useSuspenseQuery<{ characters: { results: Character[] } }>(CHARACTERS_QUERY, { variables: { page: currentPage, filter: { status } } })
  const { data: characterData } = useSuspenseQuery<{ character: Character }>(CHARACTER_QUERY, { variables: { characterId: characterId }, skip: !characterId })

  const characters = charactersData?.characters?.results
  const character = characterData?.character

  return { characters, character };
}
