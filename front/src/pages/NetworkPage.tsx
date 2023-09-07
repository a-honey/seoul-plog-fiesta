import React, { useState } from 'react';
import Layout from './Layout';
import { useLocation } from 'react-router-dom';
import useIsLogin from '../hooks/useIsLogin';
import PageNav from '../components/common/PageTap';
import ItemList from '../components/network';

const NetworkPage: React.FC = () => {
  const lists: Record<string, string> = { group: 'GROUP', user: 'USER' };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState<string | null>(searchParams.get('view'));

  useIsLogin();

  return (
    <Layout>
      <main>
        <PageNav
          view={view}
          setView={setView as React.Dispatch<React.SetStateAction<string>>}
          lists={lists}
          params={'network'}
        />
        <ItemList />
      </main>
    </Layout>
  );
};

export default NetworkPage;
