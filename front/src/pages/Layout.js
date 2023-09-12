import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Nav from '../components/layout/Nav';
import Plogging from '../components/common/Plogging';
import Toast from '../components/common/Toast';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import useIsLogin from '../hooks/useIsLogin';

let socket;

const Layout = ({ children }) => {
  const [isWriting, setIsWriting] = useState(false);
  const { isToastOpen } = useSelector((state) => state.toast);
  const user = useSelector((state) => state.user);
  const userToken = localStorage.getItem('userToken');
  const isLogin = user.loginId && userToken;

  useEffect(() => {
    if (isLogin) {
      socket = io.connect('ws://localhost:3001', {
        path: '/chat',
        extraHeaders: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      socket.on('connect', () => {
        console.log('소켓이 연결되었습니다.');
      });
    }
  }, [userToken, isLogin, user]);

  return (
    <>
      <Header setIsWriting={setIsWriting} />
      <Nav />
      {isToastOpen && <Toast />}
      {isWriting && <Plogging setIsWriting={setIsWriting} />}
      {children}
    </>
  );
};

export { socket };
export default Layout;
