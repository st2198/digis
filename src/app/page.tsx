'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { LOO_BY_ID_QUERY, LOO_QUERY } from "@/services/queries/looQuery";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

type Loo = {
  id: string;
  name: string;
  accessible: string;
  allGender: string;
  men: string;
  women: string;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [looId, setLooId] = useState("")
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  const { data: loosData } = useSuspenseQuery<{ loos: { loos: Loo[] } }>(LOO_QUERY, { variables: { page: currentPage } })
  const { data: looData } = useSuspenseQuery<{ loo: Loo }>(LOO_BY_ID_QUERY, { variables: { id: looId }, skip: !looId })

  const loos = loosData?.loos?.loos
  const selectedLoo = looData?.loo

  const router = useRouter();

  useEffect(() => {
    const authUser = localStorage.getItem('authUser');

    if (!authUser) {
      router.push('/login');
    }

  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authUser');

    router.push('/login');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="flex gap-32">
        <div className="p-8 flex flex-col justify-center rounded-xl border min-w-96">
          <ul>
            {loos?.map(loo => (
              <li key={loo.id} onClick={() => setLooId(loo.id)} className="cursor-pointer">
                {loo.name}
              </li>
            ))}
          </ul>
          <div className="pagination-controls flex gap-4 justify-center mt-16">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
              Previous
            </button>
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </div>
        </div>

        {selectedLoo && (
          <div className="p-8 flex flex-col justify-center items-center rounded-xl border min-w-96">
            <h2>{selectedLoo.name}</h2>
            <p>Accessible: {selectedLoo.accessible ? '✅' : '❌'}</p>
            <p>All Gender: {selectedLoo.allGender ? '✅' : '❌'}</p>
            <p>Men: {selectedLoo.men ? '✅' : '❌'}</p>
            <p>Women: {selectedLoo.women ? '✅' : '❌'}</p>
          </div>
        )}
      </div>
    </main>
  )
}
