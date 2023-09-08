import React, { useContext, useEffect, useState } from 'react';
import Api from '../../api';
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom';
import { seoulDistricts } from '../../assets/exportData';
import MyRanking from '../feat/Ranking';
import { handleImgUrl } from '../../utils/handleImgUrl';
import { UserIdContext } from '../../pages/UserIdPage';
import user_none from '../../assets/user_none.png';
import { useDispatch } from 'react-redux';
import { openToast, setToastMessage } from '../../features/toastSlice';
import { UserDataType } from '../../types/fetchDataTypes';

const Info = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<UserDataType | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isMyRankingOpen, setIsMyRankingOpen] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const ownerId = currentPath.split('/')[2].split('?')[0];
  const { friends } = useContext(UserIdContext);

  const [imgContainer, setImageContainer] = useState(null);
  const isFriend = friends.includes(parseInt(ownerId));

  /*
  const handleChat = () => {
    setChatId(currentPath.split('/')[2].split('?')[0]);
    setIsChatOpen(!isChatOpen);
  };
  */

  const handleClick = async () => {
    try {
      await Api.post(`/req/${ownerId}`, '');
      dispatch(setToastMessage('친구 요청이 완료되었습니다.'));
      dispatch(openToast());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/search/${ownerId}`);
        setData(res.data.searchId);
        await Api.get(`/profileimg/${ownerId}`)
          .then((res) => setImageContainer(res.data))
          .catch((err) => setImageContainer(null));
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [ownerId]);

  return (
    <div className={`gContainer`}>
      {isMyRankingOpen && (
        <MyRanking
          setIsMyRankingOpen={setIsMyRankingOpen}
          name="내 친구"
          id={parseInt(ownerId)}
        />
      )}
      <div className="titleContainer">
        <h1>{data?.nickname}의 정보</h1>
      </div>
      <ul className={styles.info}>
        <div className={styles.imgContainer}>
          <img
            src={imgContainer ? handleImgUrl(imgContainer) : user_none}
            onError={(e) => (e.currentTarget.src = user_none)}
            alt="profile"
          />
        </div>
        <li key="myNickName">
          <label>별명</label>
          <div>{data?.nickname}</div>
        </li>
        <li key="myAbout">
          <label>소개</label>
          <div>{data?.about}</div>
        </li>
        {data?.activity && (
          <li key="activity">
            <label>지역구</label>
            <div>{seoulDistricts[data.activity]}</div>
          </li>
        )}
      </ul>
      {isFriend ? (
        <button
          className="gBtn"
          onClick={() => {
            setIsMyRankingOpen(true);
          }}
        >
          친구랭킹
        </button>
      ) : (
        <button className="gBtn" onClick={handleClick}>
          친구추가
        </button>
      )}
      <button
        className="gBtn"
        onClick={() => {
          alert('준비중인 기능입니다');
        }}
      >
        채팅보내기
      </button>
    </div>
  );
};

export default Info;
