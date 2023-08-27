import React, { useEffect, useState } from 'react';
import * as Api from '../../api';

const MyGroup = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/certpost`);
        setDatas(res.data);
      } catch (err) {
        console.log('모임데이터를 불러오는데 실패.', err);
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
      <div className="contentMinContainer">
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data) => <Item key={data.id} data={data} />)
        )}
      </div>
    </div>
  );
};

export default MyGroup;

const Item = ({ data }) => {
  return (
    <div>
      <h2>{data.title}</h2>
      <div>모임 게시글 작성자</div>
    </div>
  );
};
