import { useEffect, useState } from 'react';
import MyGroup from './MyGroup';
import styles from './index.module.scss';
import * as Api from '../../api';

const MyGroups = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/mygroup`);
        setDatas(res.data);
      } catch (err) {
        console.log('모임데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className={`gContainer ${styles.groupContainer}`}>
      <div className="titleContainer">
        <h1>모임관리</h1>
      </div>
      <div className={styles.shortBox}>
        {datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data) => (
            <MyGroup key={`mygroup_${data.id}`} data={data} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyGroups;
