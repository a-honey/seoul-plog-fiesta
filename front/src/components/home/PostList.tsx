import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import Api from '../../api';
import { useSelector } from 'react-redux';
import { handlePagenation } from '../../utils/handlePagenation';
import Pagination from '../common/Pagenation';
import PloggingShow from '../common/PlogginShow';
import { handleCreatedDate } from '../../utils/handleCreatedDate';
import { RootState } from '../../store';
import { PostDataType } from '../../types/fetchDataTypes';

const PostList = ({ view }: { view: string }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  const user = useSelector((state: RootState) => state.user);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginatedData = handlePagenation(datas, currentPage, itemsPerPage);

  const handlePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/user/cert/list`);

        setDatas(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [view, user]);

  return (
    <div className="gContainer  gList navVh">
      <div className="titleContainer">
        <h1>나의 인증글보기</h1>
      </div>
      <div className={styles.postList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          paginatedData.map((data: PostDataType, index: number) => (
            <Item data={data} key={data.id} order={index + 1} />
          ))
        )}
      </div>
      <div>
        <Pagination
          totalPages={Math.ceil(datas.length / itemsPerPage)}
          currentPage={currentPage}
          handlePage={handlePage}
        />
      </div>
    </div>
  );
};

export default PostList;

const Item = ({ data, order }: { data: PostDataType; order: number }) => {
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
        className={styles.postItem}
        onClick={() => {
          setIsPlogginShowOpen(true);
        }}
      >
        <div>{order}</div>
        <div>|</div>
        <div>{data.title}</div>
        <div>{handleCreatedDate(data.createdAt)}</div>
      </div>
    </>
  );
};
