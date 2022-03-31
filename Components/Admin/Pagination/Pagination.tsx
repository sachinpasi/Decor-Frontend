import React, { useEffect } from "react";
import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";

interface Props {
  currentPage: number;
  totalPages: number;
  handleNextPage: (page: number) => void;
  handlePrevPage: (page: number) => void;
}
const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className="my-8 flex justify-end">
      <nav
        className="relative z-0 inline-flex items-center space-x-4 rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          onClick={() => handlePrevPage(currentPage)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Previous</span>
          <BsChevronBarLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <span className="pagination-page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handleNextPage(currentPage)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Next</span>
          <BsChevronBarRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
