import { useState } from 'react';

export function useCharacterPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<"Alive" | "Dead">("Alive");

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return { currentPage, handlePageChange, status, setStatus };
}
