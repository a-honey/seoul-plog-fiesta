import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Api from '../../api';
import { handleImgUrl } from '../../utils/handleImgUrl';
import user_none from '../../assets/user_none.png';
import { useNavigate } from 'react-router-dom';
import { NetworkGroupType } from '../../types/fetchDataTypes';

const MyGroups = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/mygroup`);
        setDatas(res.data.groups);
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className={`gContainer ${styles.groupContainer}`}>
      <div className="titleContainer">
        <h1>모임관리</h1>
      </div>
      <div className={styles.shortBox}>
        {isFetching ? (
          <div>로딩중</div>
        ) : !datas || datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data: NetworkGroupType) => (
            <MyGroup
              key={`mygroup_${data.id}`}
              data={data}
              setDatas={
                setDatas as React.Dispatch<
                  React.SetStateAction<NetworkGroupType[]>
                >
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyGroups;

const MyGroup = ({
  data,
  setDatas,
}: {
  data: NetworkGroupType;
  setDatas: React.Dispatch<React.SetStateAction<NetworkGroupType[]>>;
}) => {
  const navigator = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (confirmDelete) {
      try {
        await Api.get(`/group/${data.id}`);
        setDatas((datas) => datas.filter((prev) => prev.id !== data.id));
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('그룹 탈퇴가 취소되었습니다.');
    }
  };

  return (
    <div
      className={styles.myGroup}
      onClick={() => {
        navigator(`/groups/${data.id}?admin=${data.managerId}&view=main`);
      }}
    >
      <div className={styles.imgContainer}>
        <img
          src={
            !data.imageUrl || data.imageUrl.length === 0
              ? user_none
              : handleImgUrl(data.imageUrl)
          }
          alt="이미지"
        />
      </div>
      <div>{data.name}</div>
    </div>
  );
};
