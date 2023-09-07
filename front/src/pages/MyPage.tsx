import Layout from './Layout';
import useIsLogin from '../hooks/useIsLogin';
import RequestList from '../components/my/RequestList';
import MyInfo from '../components/my/MyInfo';
import MyGroups from '../components/my/MyGroups';
import MyUsers from '../components/my/MyUsers';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import React from 'react';

const MyPage: React.FC = () => {
  const isRequestListOpen = useSelector(
    (state: RootState) => state.relation.isRequestListOpen,
  );

  useIsLogin();

  return (
    <Layout>
      <main>
        {isRequestListOpen && <RequestList />}
        <div className="threeContainer fullVh">
          <MyInfo />
          <div className="box">
            <MyGroups />
            <MyUsers />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default MyPage;
