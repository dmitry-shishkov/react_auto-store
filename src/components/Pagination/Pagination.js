import React from "react";
import styles from "./Pagination.module.scss";

export const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <ul className={styles.pageList}>
        {
          pageNumbers.map(number => (
            <li key={number}>
              <button
                className={(currentPage === number) ? `${styles.pageBtnActive}` : `${styles.pageBtn}`}
                onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
