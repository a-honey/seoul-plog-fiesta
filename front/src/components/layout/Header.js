import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import * as Api from '../../api';
import { useEffect } from 'react';

const Header = ({ setIsWriting }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);

  const token = sessionStorage.getItem('userToken');

  const location = useLocation();

  const currentPath = location.pathname;

  const searchParams = new URLSearchParams(location.search);

  const adminValue = searchParams.get('admin');

  const isAdmin = adminValue == user.loginId;

  console.log(user);
  const handleLogoutClick = () => {
    dispatch(logout());
    navigator('/intro');
  };
  const handleGroupClick = async () => {
    try {
      const res = await Api.post(`/group/join/${currentPath.split('/')[2]}`);
      alert('가입 요청 성공');
    } catch (err) {
      alert(err.message ? err.message : '가입 요청 실패.');
    }
  };

  const isGroupPage = (path) => {
    const pathSegments = path.split('/');
    return pathSegments.length === 3 && pathSegments[1] === 'groups';
  };

  const isUserPage = (path) => {
    const pathSegments = path.split('/');
    return pathSegments.length === 3 && pathSegments[1] === 'users';
  };

  const handleUserClick = async () => {
    try {
      await Api.post(`/req/${currentPath.split('/')[2]}`, {
        id: currentPath.split('/')[2],
      });
      alert('가입 요청 성공');
    } catch (err) {
      alert(err.message ? err.message : '가입 요청 실패.');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.min}>SPF;</div>
        <div className={styles.full}>
          Seoul<span>Plog</span>Fiesta
        </div>
      </div>
      <nav className={styles.navContainer}>
        {isGroupPage(currentPath) ? (
          user.groups.includes(currentPath.split('/')[2]) ? (
            <button
              onClick={() => {
                setIsWriting(true);
              }}
            >
              인증하러가기
            </button>
          ) : (
            <button onClick={handleGroupClick}>가입요청하기</button>
          )
        ) : isUserPage(currentPath) ? (
          <button onClick={handleUserClick}>친구요청하기</button>
        ) : (
          <button
            onClick={() => {
              setIsWriting(true);
            }}
          >
            인증하러가기
          </button>
        )}
        {token ? (
          <Link to="/mypage">
            <button>마이 페이지</button>
          </Link>
        ) : (
          <Link to="/register">
            <button>회원가입</button>
          </Link>
        )}
        {token ? (
          <button onClick={handleLogoutClick}>로그아웃</button>
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
