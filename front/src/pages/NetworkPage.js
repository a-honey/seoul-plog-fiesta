import { Suspense, lazy, useEffect, useState } from 'react';
import Layout from './Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import useIsLogin from '../hooks/useIsLogin';

const PageNav = lazy(() => import('../components/common/PageNav'));
const ItemList = lazy(() => import('../components/network'));

const NetworkPage = () => {
  const lists = { group: 'GROUP', user: 'USER' };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState(searchParams.get('view'));

  useIsLogin();

  return (
    <Layout>
      <main>
        <Suspense fallback={<div>Loading PageNav...</div>}>
          <PageNav
            view={view}
            setView={setView}
            lists={lists}
            params={'network'}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ItemList />
        </Suspense>
      </main>
    </Layout>
  );
};

export default NetworkPage;
