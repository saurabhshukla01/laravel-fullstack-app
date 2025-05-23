import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="app-pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Link
            className="page-link"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          >
            Previous
          </Link>
        </li>

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

        <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
          <Link
            className="page-link"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < lastPage) onPageChange(currentPage + 1);
            }}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
