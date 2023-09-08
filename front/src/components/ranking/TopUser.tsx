import React, { useEffect, useState } from 'react';
import Api from '../../api';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { RankingUserDataType } from '../../types/fetchDataTypes';

const TopUser = ({
  isFetching,
  datas,
}: {
  isFetching: boolean;
  datas: RankingUserDataType[];
}) => {
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>상위 유저</h1>
      </div>
      <div className={`contentMinContainer ${styles.shortBox}`}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data: RankingUserDataType) => (
            <Item key={data.id} data={data} />
          ))
        )}
      </div>
    </div>
  );
};

export default TopUser;

const Item = ({ data }: { data: RankingUserDataType }) => {
  const navigator = useNavigate();

  return (
    <div
      className={styles.listItem}
      onClick={() => {
        navigator(`/users/${data.id}?view=main`);
      }}
    >
      <div>{data.rank}위</div>
      <div>{data.score}점</div>
      <div>{data.nickname}</div>
    </div>
  );
};
