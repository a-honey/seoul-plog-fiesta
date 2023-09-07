import Layout from './Layout';
import useIsLogin from '../hooks/useIsLogin';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MyGroup from '../components/home/MyGroup';
import MyUser from '../components/home/MyUser';
import MessageList from '../components/home/MessageList';
import PageNav from '../components/common/PageNav';
import Map from '../components/home/Map';
import ItemList from '../components/home/PostList';

const HomePage: React.FC = () => {
  const lists: Record<string, string> = {
    main: '홈',
    myposts: '나의 인증글',
  };

  useIsLogin();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState<string | null>(searchParams.get('view'));
  const pwToken: string | null = searchParams.get('token');
  const email: string | null = searchParams.get('email');

  useEffect(() => {
    if (pwToken) {
      navigate(`/changepassword?email=${email}&token=${pwToken}`);
    }
  }, [navigate, pwToken, email]);

  return (
    <Layout>
      <main>
        <PageNav view={view} setView={setView} lists={lists} params={''} />
        {!view || view === 'main' ? (
          <div className="threeContainer fullVh">
            <Map />
            <div className="box">
              <MyGroup />
              <MyUser />
            </div>
          </div>
        ) : view === 'myposts' ? (
          <ItemList view={view} />
        ) : (
          <MessageList view={view} />
        )}
      </main>
    </Layout>
  );
};

export default HomePage;
