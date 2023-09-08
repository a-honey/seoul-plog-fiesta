import React, { useContext, useEffect, useState } from 'react';
import Api from '../../api';
import { useParams } from 'react-router-dom';
import { handleCreatedDate } from '../../utils/handleCreatedDate';
import styles from './index.module.scss';
import { GroupIdContext } from '../../pages/GroupIdPage';
import { PostDataType } from '../../types/fetchDataTypes';

const GroupUsers = () => {
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>인증 현황</h1>
      </div>
      <List />
    </div>
  );
};

export default GroupUsers;

const List = () => {
  const { groupId } = useParams();
  const { name } = useContext(GroupIdContext);

  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/certpost/${name}`);
        if (res.data.posts === '인증게시글 없음') {
          setDatas([]);
        } else {
          setDatas(res.data.posts.slice(0, 5));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [groupId, name]);

  return (
    <div className="contentMinContainer">
      <div className={styles.userList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data: PostDataType, index) => (
            <Item key={`${data.id}`} data={data} order={index + 1} />
          ))
        )}
      </div>
    </div>
  );
};

const Item = ({ data, order }: { data: PostDataType; order: number }) => {
  return (
    <div className={styles.mainItem}>
      <div>{order}</div>
      <div>{data.title}</div>
      <div>{handleCreatedDate(data.createdAt)}</div>
    </div>
  );
};
