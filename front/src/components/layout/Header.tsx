import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/userSlice';
import Api from '../../api';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { openToast, setToastMessage } from '../../features/toastSlice';
import {
  toggleRequestList,
  toggleGroupRequestList,
} from '../../features/relationSlice';
import { RootState } from '../../store';

type ButtonItem = {
  condition: boolean;
  text: string;
  onClick: () => void;
};

const Header = ({
  setIsWriting,
}: {
  setIsWriting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem('userToken');

  const location = useLocation(); //location {pathname: '/groups/1', search: '?admin=4&view=main', hash: '', state: null, key: 'nsywyzak'}
  const currentPath = location.pathname;
  const searchParams = new URLSearchParams(location.search);

  const adminValue = searchParams.get('admin');
  const isGroupAdmin = adminValue === user.loginId;

  const id = currentPath.split('/')[2];

  const [visibleButton, setVisibleButton] = useState<ButtonItem>();

  const handleJoinGroup = useCallback(async () => {
    if (!user.groups.includes(id))
      try {
        await Api.post(`/group/join/${id}`, '');
        alert('가입 요청 성공');
      } catch (error) {
        console.log(error);
      }
  }, [id, user.groups]);

  const handleSendFriendRequest = useCallback(async () => {
    try {
      await Api.post(`/req/${id}`, {
        id: id,
      });
      dispatch(setToastMessage('친구 요청에 성공했습니다'));
      dispatch(openToast());
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch]);

  const handleFriendRequestList = useCallback(() => {
    dispatch(toggleRequestList());
  }, [dispatch]);

  const handleGroupRequestList = useCallback(async () => {
    dispatch(toggleGroupRequestList());
  }, [dispatch]);

  const buttons = useMemo(
    () => [
      {
        condition:
          currentPath.includes('/group/') &&
          user.groups &&
          !user.groups.includes(id),
        text: '가입 요청하기',
        onClick: handleJoinGroup,
      },
      {
        condition:
          currentPath.includes('/user/') &&
          user.users &&
          !user.users.includes(id),
        text: '친구 요청하기',
        onClick: handleSendFriendRequest,
      },
      {
        condition: currentPath === '/mypage',
        text: '친구요청목록',
        onClick: handleFriendRequestList,
      },
      {
        condition: isGroupAdmin,
        text: '가입요청목록',
        onClick: handleGroupRequestList,
      },
    ],
    [
      handleGroupRequestList,
      handleJoinGroup,
      handleSendFriendRequest,
      handleFriendRequestList,
      currentPath,
      id,
      isGroupAdmin,
      user,
    ],
  );

  useEffect(() => {
    const updatedVisibleButton: ButtonItem | undefined = buttons.find(
      (button) => button.condition,
    );
    setVisibleButton(updatedVisibleButton);
  }, [currentPath, user.groups, user.users, isGroupAdmin, buttons]);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.min}>SPF;</div>
        <div className={styles.full}>
          Seoul<span>Plog</span>Fiesta
        </div>
      </div>
      <nav className={styles.navContainer}>
        {visibleButton ? (
          <button onClick={visibleButton.onClick}>{visibleButton.text}</button>
        ) : token && user.email ? (
          <button
            onClick={() => {
              setIsWriting(true);
            }}
          >
            인증하러가기
          </button>
        ) : null}
        {token && user.email ? (
          <Link to="/mypage">
            <button>마이 페이지</button>
          </Link>
        ) : (
          <Link to="/register">
            <button>회원가입</button>
          </Link>
        )}
        {token && user.email ? (
          <button
            onClick={() => {
              dispatch(logout());
              navigator('/intro');
            }}
          >
            로그아웃
          </button>
        ) : (
          <Link to="/login">
            <button>로그인</button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
