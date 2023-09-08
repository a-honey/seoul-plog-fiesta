import Layout from './Layout';
import useIsLogin from '../hooks/useIsLogin';
import GroupMember from '../components/groupId/Member';
import GroupPlogging from '../components/groupId/PloggingPost';
import GroupMap from '../components/groupId/Map';
import GroupRequestList from '../components/groupId/GroupRequest';
import PageNav from '../components/common/PageTap';
import { useSelector } from 'react-redux';
import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Api from '../api';
import GroupUsers from '../components/groupId/UsersPosts';
import GroupPosts from '../components/groupId/GroupPosts';
import Notice from '../components/groupId/Notice';
import { RootState } from '../store';
import { AxiosError } from 'axios';

export const GroupIdContext = createContext<{
  name: string | undefined;
  isMember: boolean;
}>({
  name: undefined,
  isMember: false,
});

const GroupIdPage: React.FC = () => {
  const lists: Record<string, string> = {
    main: '홈',
    notice: '그룹게시판',
    posts: '인증글',
    members: '멤버보기',
  };

  const isGroupRequestListOpen: boolean = useSelector(
    (state: RootState) => state.relation.isGroupRequestListOpen,
  );

  const { groupId } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState<string | null>(searchParams.get('view'));

  const [name, setName] = useState<string>('');
  const [members, setMembers] = useState<string[]>([]);

  const user = useSelector((state: RootState) => state.user);
  const isMember: boolean = members.includes(user.loginId);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Api.get(`/group/${groupId}`);
        setName(res.data.name);
        setMembers(
          res.data.groupUser.map((user: { userId: string }) => user.userId),
        );
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data) {
          console.log(`ERROR MESSAGE: ${axiosError.response.data}`);
        } else {
          console.log('에러 데이터 없음.');
        }
      } finally {
      }
    };

    getData();
  }, [groupId]);

  useIsLogin();

  return (
    <Layout>
      <GroupIdContext.Provider value={{ name, isMember }}>
        <main>
          {isGroupRequestListOpen && <GroupRequestList />}
          <PageNav
            view={view}
            setView={setView as React.Dispatch<React.SetStateAction<string>>}
            lists={lists}
            params={`groups/${groupId}`}
          />
          {view === 'main' ? (
            <div className="threeContainer navVh">
              <GroupMap />
              <div className="box">
                <GroupUsers />
                <GroupPosts />
              </div>
            </div>
          ) : view === 'notice' ? (
            <Notice />
          ) : view === 'posts' ? (
            <GroupPlogging view={view} />
          ) : (
            <GroupMember
              view={view as string}
              setView={setView as React.Dispatch<React.SetStateAction<string>>}
            />
          )}
        </main>
      </GroupIdContext.Provider>
    </Layout>
  );
};

export default GroupIdPage;
