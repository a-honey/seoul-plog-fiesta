import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Api from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { seoulDistricts } from '../../assets/exportData';
import styles from './index.module.scss';
import { handlePagenation } from '../../utils/handlePagenation';
import Pagination from '../common/Pagenation';
import { GroupIdContext } from '../../pages/GroupIdPage';
import { openToast, setToastMessage } from '../../features/toastSlice';
import { RootState } from '../../store';
import { UserDataType } from '../../types/fetchDataTypes';

const GroupMember = ({
  setView,
  view,
}: {
  setView: React.Dispatch<React.SetStateAction<string>>;
  view: string;
}) => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  const { groupId } = useParams();

  const { isMember } = useContext(GroupIdContext);

  const user = useSelector((state: RootState) => state.user);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const adminValue = searchParams.get('admin');
  const isGroupAdmin = adminValue === user.loginId;

  const navigator = useNavigate();

  const itemsPerPage = 18;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = handlePagenation(datas, currentPage, itemsPerPage);

  const handlePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleGroupDelete = async () => {
    try {
      await Api.delete(`/group/drop/${groupId}`);
      navigator('/network?view=group');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroupRequest = async () => {
    try {
      await Api.post(`/group/join/${groupId}`, '');
      dispatch(setToastMessage('가입 요청에 성공했습니다'));
      dispatch(openToast);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/${groupId}`);
        setDatas(res.data.groupUser);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [groupId, navigator, adminValue, isMember]);

  return (
    <div className="gContainer  gList navVh">
      <div className="titleContainer">
        <h1>멤버 리스트</h1>
        {isGroupAdmin && (
          <button className="gBtn" onClick={handleGroupDelete}>
            그룹 삭제하기
          </button>
        )}
        {!isGroupAdmin && !isMember && (
          <button className="gBtn" onClick={handleGroupRequest}>
            가입 요청하기
          </button>
        )}
      </div>
      <div className={styles.memberList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          paginatedData.map((data: { id: number; user: object }) => (
            <Item
              key={data.id}
              data={data.user as UserDataType}
              setDatas={
                setDatas as React.Dispatch<React.SetStateAction<UserDataType[]>>
              }
              groupId={groupId as string}
              isGroupAdmin={isGroupAdmin}
            />
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

export default GroupMember;

const Item = ({
  data,
  isGroupAdmin,
  groupId,
  setDatas,
}: {
  data: UserDataType;
  isGroupAdmin: boolean;
  groupId: string;
  setDatas: React.Dispatch<React.SetStateAction<UserDataType[]>>;
}) => {
  const navigator = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const handleOut = async () => {
    const confirm = window.confirm(`${data.nickname}님을 추방시킬까요?`);
    if (confirm) {
      try {
        await Api.delete(`/group/expulse/${groupId}/${data.id}`);
        setDatas((prev) => prev.filter((datas) => data.id !== datas.id));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('멤버 추방 취소');
    }
  };
  return (
    <div className={styles.memberItem}>
      <div
        onClick={() => {
          navigator(`/users/${data.id}`);
        }}
      >
        {data.nickname}
      </div>
      <div>{data.about}</div>
      <div>
        {data.activity ? seoulDistricts[data.activity] : '활동 지역 정보 없음'}
      </div>
      {isGroupAdmin && data.id !== parseInt(user.loginId) && (
        <button className={styles.expulse} onClick={handleOut}>
          X
        </button>
      )}
    </div>
  );
};
