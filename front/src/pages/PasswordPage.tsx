import React, { useEffect } from 'react';
import Layout from './Layout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PasswordChange from '../components/user/PasswordChange';
import { RootState } from '../store';

const PasswordPage: React.FC = () => {
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
        <PasswordChange />
      </main>
    </Layout>
  );
};

export default PasswordPage;
