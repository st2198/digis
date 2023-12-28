"use client";

import React, { useState } from "react";

import { Header, TableWithPagination } from "@/components";
import { useCharacterPagination } from '@/hooks/useCharacterPagination';
import { useCharacterData } from '@/hooks/useCharacterData';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Home = () => {
  const isUserAuth = useAuthRedirect('/login');
  const { currentPage, handlePageChange, status, setStatus } = useCharacterPagination();
  const [characterId, setCharacterId] = useState("");
  const { characters, character } = useCharacterData(currentPage, status, characterId);

  return (
    isUserAuth && (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
        <Header />
        <div className="flex gap-32 items-start">
          <div className="bg-white p-8 flex flex-col justify-center rounded-xl border min-w-96">
            <TableWithPagination
              characters={characters}
              isAlive={status === "Alive"}
              currentPage={currentPage}
              handleNextPageClick={() => handlePageChange(currentPage + 1)}
              handlePrevPageClick={() => handlePageChange(currentPage - 1)}
              onCharacterSelect={setCharacterId}
              onAliveFilter={() => setStatus("Alive")}
              onDeadFilter={() => setStatus("Dead")}
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

export default Home;
