import { useSelector } from 'react-redux';
import Layout from './Layout';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/user/Login';
import { RootState } from '../store';

const LoginPage: React.FC = () => {
  const navigator = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (token && user.email !== '') {
      navigator('/');
    }
  }, [navigator, token, user]);

  return (
    <Layout>
      <main>
        <Login />
      </main>
    </Layout>
  );
};

export default LoginPage;
