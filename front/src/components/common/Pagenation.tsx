import styles from './index.module.scss';
import React from 'react';

const Pagination = ({
  totalPages,
  currentPage,
  handlePage,
}: {
  totalPages: number;
  currentPage: number;
  handlePage: (pageNumber: number) => void;
}) => {
  currentPage = Number(currentPage);

  function handleLeftClick() {
    handlePage(currentPage - 1);
  }

  function handleRightClick() {
    handlePage(currentPage + 1);
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? styles.active : ''}
          onClick={() => {
            handlePage(i);
          }}
        >
          {i}
        </li>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagenation}>
      <ul>
        <li
          className={currentPage === 1 ? styles.disabled : ''}
          onClick={currentPage === 1 ? undefined : handleLeftClick}
        >
          &lt;
        </li>

        {/* 페이지 번호 */}
        {renderPageNumbers()}

        <li
          className={currentPage === totalPages ? styles.disabled : ''}
          onClick={currentPage === totalPages ? undefined : handleRightClick}
        >
          &gt;
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
