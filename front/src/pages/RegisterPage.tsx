import { useSelector } from 'react-redux';
import Layout from './Layout';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../components/user/Register';
import { RootState } from '../store';

const RegistePage = () => {
  const navigator = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem('userToken');

  // user의 상태가 존재하면 홈 페이지로 이동시킴
  useEffect(() => {
    if (token && user.email !== '') {
      navigator('/');
    }
  }, [navigator, token, user]);

  return (
    <Layout>
      <main>
        <Register />
      </main>
    </Layout>
  );
};

export default RegistePage;
