import { useNavigate, useParams } from 'react-router-dom';
import Layout from './Layout';
import useIsLogin from '../hooks/useIsLogin';
import { useSelector } from 'react-redux';
import React, { createContext, useEffect, useState } from 'react';
import * as Api from '../api';
import Info from '../components/userId/Info';
import UserMap from '../components/userId/Map';
import { RootState } from '../store';

export const UserIdContext = createContext<{ friends: number[] }>({
  friends: [],
});

const UserIdPage = () => {
  const { userId } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();

  useIsLogin();

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Api.get(`/friends`);
        setFriends(res.data.friendsList.map((user: { id: string }) => user.id));
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (userId === user.loginId) {
      navigator('/mypage');
    }
  }, [navigator, user, userId]);

  return (
    <Layout>
      <UserIdContext.Provider value={{ friends }}>
        <main>
          <div className="threeContainer fullVh">
            <Info />
            <UserMap />
          </div>
        </main>
      </UserIdContext.Provider>
    </Layout>
  );
};

export default UserIdPage;
