import React, { useEffect, useState } from 'react';
import Api from '../../api';
import styles from './index.module.scss';
import { handleCreatedDate } from '../../utils/handleCreatedDate';
import Pagination from '../common/Pagenation';
import { handlePagenation } from '../../utils/handlePagenation';
import PloggingShow from '../common/PlogginShow';
import { PostMinDataType } from '../../types/fetchDataTypes';

const AllPostList = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const paginatedData = handlePagenation(datas, currentPage, itemsPerPage);

  const handlePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(
          `/plo/post?limit=${itemsPerPage}&page=${currentPage}`,
        );
        setDatas(res.data.posts);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [currentPage]);

  return (
    <div className="gContainer  gList navVh">
      <div className="titleContainer">
        <h1>모든 인증글</h1>
      </div>
      <div className={styles.allPostList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          datas.map((data: PostMinDataType, index) => (
            <Item data={data} key={data.id} order={index + 1} />
          ))
        )}
      </div>
      <div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePage={handlePage}
        />
      </div>
    </div>
  );
};

export default AllPostList;

const Item = ({ data, order }: { data: PostMinDataType; order: number }) => {
  const [isPlogginShowOpen, setIsPlogginShowOpen] = useState(false);

  return (
    <>
      {isPlogginShowOpen && (
        <PloggingShow
          id={data.id}
          setIsPlogginShowOpen={setIsPlogginShowOpen}
        />
      )}
      <div
        className={styles.allPostItem}
        onClick={() => {
          setIsPlogginShowOpen(true);
        }}
      >
        <div>{data.title}</div>
        <div>{handleCreatedDate(data.createdAt)}</div>
      </div>
    </>
  );
};
