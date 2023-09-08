import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Api from '../../api';
import { toggleRequestList } from '../../features/relationSlice';
import { useDispatch } from 'react-redux';
import { RequestType } from '../../types/fetchDataTypes';

const RequestList = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/req/list`);
        setDatas(res.data.friendRequest.map((data: any) => data.userA));
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="modal">
      <form>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>친구 요청이 없습니다</div>
        ) : (
          datas.map((data) => (
            <Item
              data={data}
              setDatas={
                setDatas as React.Dispatch<React.SetStateAction<RequestType[]>>
              }
            />
          ))
        )}
        <button
          onClick={() => {
            dispatch(toggleRequestList());
          }}
          className="gBtn"
        >
          뒤로가기
        </button>
      </form>
    </div>
  );
};

export default RequestList;

const Item = ({
  data,
  setDatas,
}: {
  data: RequestType;
  setDatas: React.Dispatch<React.SetStateAction<RequestType[]>>;
}) => {
  const handleOk = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await Api.post(`/accept/${data.id}`, '');
      setDatas((datas) => datas.filter((prev) => prev.id !== data.id));
      alert('수락 성공');
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await Api.delete(`/reject/${data.id}`);
      setDatas((datas) => datas.filter((prev) => prev.id !== data.id));
      alert('거절 성공');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.requestItem}>
      <div>{data.nickname}</div>
      <div>
        <button onClick={(e) => handleOk(e)}>수락</button>
        <button onClick={(e) => handleReject(e)}>거절</button>
      </div>
    </div>
  );
};
