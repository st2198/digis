'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { LOO_BY_ID_QUERY, LOO_QUERY } from "@/services/queries/looQuery";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Header, TableWithPagination } from "@/components";

type Loo = {
  id: string;
  name: string;
  accessible: string;
  allGender: string;
  men: string;
  women: string;
}

export default function Home() {
  const [isUserAuth, setUserAuth] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(true)
  const [looId, setLooId] = useState("")
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  const { data: loosData } = useSuspenseQuery<{ loos: { loos: Loo[] } }>(LOO_QUERY, { variables: { page: currentPage, active: isActive } })
  const { data: looData } = useSuspenseQuery<{ loo: Loo }>(LOO_BY_ID_QUERY, { variables: { id: looId }, skip: !looId })

  const loos = loosData?.loos?.loos
  const selectedLoo = looData?.loo

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
        <div className="flex gap-32">
          <div className="bg-white p-8 flex flex-col justify-center rounded-xl border min-w-96">
            <TableWithPagination
              loos={loos}
              isActive={isActive}
              currentPage={currentPage}
              handleNextPageClick={() => handlePageChange(currentPage + 1)}
              handlePrevPageClick={() => handlePageChange(currentPage - 1)}
              onLooSelect={setLooId}
              onActiveFilter={() => setIsActive(true)}
              onNotActiveFilter={() => setIsActive(false)}
            />
          </div>

          <div className={`bg-white p-8 flex flex-col justify-center items-center rounded-xl border min-w-96 ${selectedLoo ? '' : 'invisible'}`}>
            {selectedLoo && (
              <>
                <h2>{selectedLoo.name}</h2>
                <p>Accessible: {selectedLoo.accessible ? '✅' : '❌'}</p>
                <p>All Gender: {selectedLoo.allGender ? '✅' : '❌'}</p>
                <p>Men: {selectedLoo.men ? '✅' : '❌'}</p>
                <p>Women: {selectedLoo.women ? '✅' : '❌'}</p>
              </>
            )}
          </div>
        </div>
      </main>
    )
  )
}
