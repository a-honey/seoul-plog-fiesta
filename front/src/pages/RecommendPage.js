import useIsLogin from '../hooks/useIsLogin';
import Layout from './Layout';
import { useEffect, useState } from 'react';

const RecommendPage = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  useIsLogin();

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/seoul_course_map.html';
    iframe.title = 'Seoul Course Map';
    iframe.frameBorder = '0';
    iframe.style.width = '75vw';
    iframe.style.maxWidth = '1200px';
    iframe.style.maxHeight = '700px';
    iframe.style.height = '80vw';

    iframe.onload = () => {
      setIframeLoaded(true);
    };

    const iframeContainer = document.getElementById('iframeContainer');
    iframeContainer.appendChild(iframe);
  }, []);

  return (
    <Layout>
      <main>
        <div
          className="gContainer  gList navVh"
          style={{ justifyContent: 'space-between' }}
        >
          <div className="titleContainer">
            <h1>추천 경로</h1>
          </div>
          <div
            id="iframeContainer"
            className="iframeContainer"
            style={{
              width: '75vw',
              maxWidth: '1200px',
              maxHeight: '700px',
              height: '80vh',
              overflow: 'hidden',
              overflowX: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {iframeLoaded ? null : <div>Loading...</div>}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default RecommendPage;
