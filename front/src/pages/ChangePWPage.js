import { useEffect } from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import PasswordChangeSuccess from '../components/user/PasswordChangeSuccess';
import useIsLogin from '../hooks/useIsLogin';

const PasswordEmailSuccessPage = () => {
  const navigator = useNavigate();

  const isLogin = useIsLogin();
  // user의 상태가 존재하면 홈 페이지로 이동시킴
  useEffect(() => {
    if (isLogin) {
      navigator('/');
      return;
    }
  }, [navigator, isLogin]);

  return (
    <>
      {isLogin && (
        <Layout>
          <main>
            <PasswordChangeSuccess />
          </main>
        </Layout>
      )}
    </>
  );
};

export default PasswordEmailSuccessPage;
