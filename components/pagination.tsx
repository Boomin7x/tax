import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IPagination {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  align?: "center" | "end";
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  align,
}: IPagination) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPageNumbers = 5;
    const halfPageNumbers = Math.floor(totalPageNumbers / 2);

    let startPage = Math.max(currentPage - halfPageNumbers, 1);
    let endPage = Math.min(currentPage + halfPageNumbers, totalPages);

    if (currentPage <= halfPageNumbers) {
      endPage = Math.min(totalPageNumbers, totalPages);
    } else if (currentPage + halfPageNumbers >= totalPages) {
      startPage = Math.max(totalPages - totalPageNumbers + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          className="rounded-sm transition-all duration-300"
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-2",
        align === "center" && "justify-center",
        align === "end" && "justify-end"
      )}
    >
      <Button
        size="sm"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="bg-neutral-900 rounded-sm"
      >
        First
      </Button>
      <Button
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-sm"
      >
        <ChevronsLeft />
      </Button>
      {renderPageNumbers()}
      <Button
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-sm"
      >
        <ChevronsRight />
      </Button>
      <Button
        size="sm"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="bg-neutral-900 rounded-sm"
      >
        Last
      </Button>
    </div>
  );
};

export default Pagination;
