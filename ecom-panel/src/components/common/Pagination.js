import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];

    if (lastPage <= 4) {
      // show all if total pages are 4 or less
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      // more than 4 pages
      if (currentPage <= 2) {
        pages.push(1, 2, 3, 4);
      } else if (currentPage >= lastPage - 1) {
        pages.push(lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="app-pagination">
      <ul className="pagination justify-content-center">

        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Link
            className="page-link"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          >
            &laquo;
          </Link>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((num) => (
          <li
            key={num}
            className={`page-item ${currentPage === num ? 'active' : ''}`}
          >
            <Link
              className="page-link"
              to="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(num);
              }}
            >
              {num}
            </Link>
          </li>
        ))}

        {/* Next Button */}
        <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
          <Link
            className="page-link"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < lastPage) onPageChange(currentPage + 1);
            }}
          >
            &raquo;
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
