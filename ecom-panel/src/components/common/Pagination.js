import React from 'react';

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  const generatePageNumbers = () => {
    const totalVisiblePages = 12;
    const pages = [];

    // Always include the first page
    pages.push(1);

    let startPage = Math.max(currentPage - Math.floor((totalVisiblePages - 4) / 2), 2);
    let endPage = startPage + totalVisiblePages - 3; // -3: first + 2 last

    // Adjust end if it exceeds lastPage - 2
    if (endPage >= lastPage - 1) {
      endPage = lastPage - 1;
      startPage = Math.max(endPage - (totalVisiblePages - 3), 2);
    }

    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always include last 2 pages if not already in
    if (lastPage > 1) {
      if (lastPage - 1 !== pages[pages.length - 1]) pages.push(lastPage - 1);
      if (lastPage !== pages[pages.length - 1]) pages.push(lastPage);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav className="app-pagination">
      <ul className="pagination justify-content-center">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          >
            Previous
          </a>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <li
            key={index}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        {/* Next Button */}
        <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < lastPage) onPageChange(currentPage + 1);
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
