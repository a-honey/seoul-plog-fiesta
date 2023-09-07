import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import styles from './index.module.scss';
import Pagination from '../common/Pagenation';
import { handlePagenation } from '../../utils/handlePagenation';
import MyLanking from '../feat/Ranking';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { RankData } from '../../types/rankTypes';

const All = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isMyRankingOpen, setIsMyRankingOpen] = useState<boolean>(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const user = useSelector((state: RootState) => state.user);

  const handlePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(
          `/plo/hundred?limit=${itemsPerPage}&page=${currentPage}`,
        );
        setDatas(res.data.users);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [currentPage]);

  return (
    <div className="gContainer  gList navVh">
      {isMyRankingOpen && (
        <MyLanking
          setIsMyRankingOpen={setIsMyRankingOpen}
          name="나"
          id={parseInt(user.loginId)}
        />
      )}
      <div className="titleContainer">
        <h1>Top 100</h1>
        <button
          className="gBtn"
          onClick={() => {
            setIsMyRankingOpen(true);
          }}
        >
          나의 랭킹
        </button>
      </div>
      <div className={styles.ranking}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          datas.map((data: RankData) => <Item data={data} key={data.id} />)
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

export default All;

const Item = ({ data }: { data: RankData }) => {
  const navigator = useNavigate();

  return (
    <div
      className={`${styles.rankingItem} ${
        data.rank && data.rank <= 3 ? styles.rankingTop3 : ''
      }`}
      onClick={() => {
        navigator(`/users/${data.id}`);
      }}
    >
      <div>{data.rank}위</div>
      <div>{data.nickname}</div>
      <div>{data.score}점</div>
      <div>{data.postCount}개 인증</div>
    </div>
  );
};
