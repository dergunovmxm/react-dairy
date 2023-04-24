/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Pagination.scss';

function Pagination({ page, countNotes, limit }) {
  const navigate = useNavigate();
  const numPages = Math.ceil(countNotes / limit);
  return (
    <section className="wrapper-pagination">
      <div
        onClick={() => {
          navigate(`?_page=${1}&_limit=${limit}`);
        }}
        className="wrapper-pagination__arrow"
      >
        <FiChevronsLeft />
      </div>

      <div
        onClick={() => {
          navigate(
            `?_page=${
              Number(page) === 1 ? Number(page) : Number(page) - 1
            }&_limit=${limit}`,
          );
        }}
        className="wrapper-pagination__arrow"
      >
        <FiChevronLeft />
      </div>

      <div className="wrapper-pagination__pages">
        {Array.from(
          {
            length: (Number(page) === 1
              ? (Number(page) === Number(numPages) ? 1 : 2)
              : (Number(page) === Number(numPages) ? 2 : 3)),
          },
          (_, i) => (Number(page) === 1 ? Number(page) : Number(page - 1)) + i,
        ).map((element) => (
          <div
            key={element}
            onClick={() => navigate(`?_page=${element}&_limit=${limit}`)}
            className={
                Number(page) === Number(element)
                  ? 'wrapper-pagination__pages__select_block'
                  : 'wrapper-pagination__pages__block'
              }
          >
            {Number(element)}
          </div>
        ))}
      </div>

      <div
        onClick={() => {
          navigate(
            `?_page=${
              Number(page) + 1 > numPages ? Number(page) : Number(page) + 1
            }&_limit=${limit}`,
          );
        }}
        className="wrapper-pagination__arrow"
      >
        <FiChevronRight />
      </div>

      <div
        onClick={() => {
          navigate(`?_page=${numPages}&_limit=${limit}`);
        }}
        className="wrapper-pagination__arrow"
      >
        <FiChevronsRight />
      </div>
    </section>

  );
}

export default Pagination;
