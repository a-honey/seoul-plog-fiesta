import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Intro from '../components/intro/Intro';
import { RootState } from '../store';

const IntroPage: React.FC = () => {
  const navigator = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (token && user.email !== '') {
      navigator('/');
    }
  }, [navigator, token, user]);

  return <Intro />;
};

export default IntroPage;
