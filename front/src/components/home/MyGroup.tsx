import React, { useEffect, useState } from 'react';
import * as Api from '../../api';
import { handleCreatedDate } from '../../utils/handleCreatedDate';
import styles from './index.module.scss';
import { PostDataType } from '../../types/homeTypes';

const MyGroup = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/certpost`);
        setDatas(
          res.data.posts.length >= 5
            ? res.data.posts.slice(0, 5)
            : res.data.posts,
        );
      } catch (error) {
        console.log(error);
        setDatas([]);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>나의 모임 현황</h1>
      </div>
      <div className={styles.userList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data: PostDataType, index: number) => (
            <Item key={data.id} data={data} order={index + 1} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyGroup;

const Item = ({ data, order }: { data: PostDataType; order: number }) => {
  return (
    <div className={styles.groupItem}>
      <div>{order}</div>
      <h2>{data.title}</h2>
      <div>{handleCreatedDate(data.createdAt)}</div>
    </div>
  );
};
