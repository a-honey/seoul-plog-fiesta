import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { RootState } from '../store';

const NotFoundPage: React.FC = () => {
  const navigator = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const token: string | null = localStorage.getItem('userToken');

  useEffect(() => {
    if (token && user.email !== '') {
      navigator('/');
    }
  }, [navigator, token, user]);

  return (
    <Layout>
      <main>
        <h1>Not Found</h1>
      </main>
    </Layout>
  );
};

export default NotFoundPage;
