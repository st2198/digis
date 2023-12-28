'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { CHARACTERS_QUERY, CHARACTER_QUERY } from "@/services/queries/looQuery";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Header, TableWithPagination } from "@/components";

type Character = {
  id: string;
  name: string;
  gender: string;
  status: string;
  species: string;
}

export default function Home() {
  const [isUserAuth, setUserAuth] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [gender, setGender] = useState<"Male" | "Female">("Male")
  const [looId, setLooId] = useState("")
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  const { data: charactersData } = useSuspenseQuery<{ characters: { results: Character[] } }>(CHARACTERS_QUERY, { variables: { page: currentPage, filter: { gender: gender } } })
  const { data: looData } = useSuspenseQuery<{ character: Character }>(CHARACTER_QUERY, { variables: { characterId: looId }, skip: !looId })


  const characters = charactersData?.characters?.results
  const character = looData?.character

  const router = useRouter();

  useEffect(() => {
    const authUser = localStorage.getItem('authUser');

    if (!authUser) {
      router.push('/login');
    } else {
      setUserAuth(true);
    }

  }, [router]);


  return (
    isUserAuth && (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
        <Header />
        <div className="flex gap-32 items-start">
          <div className="bg-white p-8 flex flex-col justify-center rounded-xl border min-w-96">
            <TableWithPagination
              characters={characters}
              isMale={gender === "Male"}
              currentPage={currentPage}
              handleNextPageClick={() => handlePageChange(currentPage + 1)}
              handlePrevPageClick={() => handlePageChange(currentPage - 1)}
              onLooSelect={setLooId}
              onMaleFilter={() => setGender("Male")}
              onFemaleFilter={() => setGender("Female")}
            />
          </div>

          <div className={`bg-white p-8 flex flex-col justify-center items-center rounded-xl border min-w-96 ${character ? '' : 'invisible'}`}>
            {character && (
              <>
                <h2>{character.name}</h2>
                <p>Gender: {character.gender}</p>
                <p>Species: {character.species}</p>
                <p>Status: {character.status}</p>
              </>
            )}
          </div>
        </div>
      </main>
    )
  )
}
