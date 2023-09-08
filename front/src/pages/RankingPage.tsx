import React, { useEffect, useState } from 'react';
import PageNav from '../components/common/PageTap';
import All from '../components/ranking/All.RankList';
import AllPostList from '../components/ranking/AllPostList';
import TopGroup from '../components/ranking/TopGroup';
import TopUser from '../components/ranking/TopUser';
import useIsLogin from '../hooks/useIsLogin';
import Layout from './Layout';
import { useLocation } from 'react-router-dom';
import Api from '../api';
import Map from '../components/ranking/Map';
import { AxiosError } from 'axios';

const RankingPage = () => {
  useIsLogin();

  const [isFetching, setIsFetching] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const lists = { main: '홈', all: 'TOP 100', allpost: '모든 인증글' };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState(searchParams.get('view'));

  useEffect(() => {
    const getDatas = async () => {
      setIsFetching(true);
      try {
        await Api.get('/plo/five').then((res) => {
          setUsers(res.data.topUsers);
          setGroups(res.data.topGroups);
        });
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data) {
          console.log(`ERROR MESSAGE: ${axiosError.response.data}`);
        } else {
          console.log('에러 데이터 없음.');
        }
      } finally {
        setIsFetching(false);
      }
    };
    getDatas();
  }, []);

  return (
    <Layout>
      <main>
        <PageNav
          view={view}
          setView={setView}
          lists={lists}
          params={'ranking'}
        />
        {!view || view === 'main' ? (
          <div className="threeContainer fullVh">
            <Map />
            <div className="box">
              <TopUser datas={users} isFetching={isFetching} />
              <TopGroup datas={groups} isFetching={isFetching} />
            </div>
          </div>
        ) : view === 'all' ? (
          <All />
        ) : (
          <AllPostList />
        )}
      </main>
    </Layout>
  );
};

export default RankingPage;
