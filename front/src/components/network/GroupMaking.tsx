import React, { ChangeEvent, useState } from 'react';
import styles from './index.module.scss';
import Api from '../../api';
import { seoulDistricts } from '../../assets/exportData';
import { useDispatch } from 'react-redux';
import post_none from '../../assets/post_none.png';
import { openToast, setToastMessage } from '../../features/toastSlice';
import { NetworkGroupType } from '../../types/fetchDataTypes';
import useImgChange from '../../hooks/useImgChange';

const GroupMaking = ({
  setIsModal,
  setDatas,
}: {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDatas: React.Dispatch<React.SetStateAction<NetworkGroupType[]>>;
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    goal: '',
  });

  const [selectData, setSelectData] = useState('');
  const [textareaData, setTextareaData] = useState('');

  const imgData = new FormData();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { handleImgChange, imgContainer, imgRef } = useImgChange();

  const uploadImage = async (groupId: number) => {
    try {
      const res = await Api.postForm(`/upload/groupimg/${groupId}`, {
        groupImage: imgContainer,
      });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const postRes = await Api.post('/group', {
        ...formData,
        selectData,
        textareaData,
      });

      if (imgData) {
        const imageUploadRes = await uploadImage(postRes.data.id);
        console.log('이미지 업로드 결과:', imageUploadRes);
      }

      postRes.data['memberCount'] = 1;
      setDatas((datas: NetworkGroupType[]) => [...datas, postRes.data]);
      setIsModal(false);
      dispatch(setToastMessage(`${postRes.data.name} 그룹이 생성되었습니다.`));
      dispatch(openToast());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h1>그룹생성</h1>
        <div className="container">
          <div className="img">
            <div className="img-container">
              <img src={post_none} ref={imgRef} alt="인증이미지" />
            </div>
            <input
              type="file"
              name="imgUrl"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={handleImgChange}
            />
          </div>
          <div className="content">
            <div>
              <label>그룹 이름</label>
              <input
                type="text"
                name="name"
                placeholder="그룹 이름"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>그룹 목표</label>
              <input
                type="text"
                name="goal"
                placeholder="그룹 목표"
                value={formData.goal}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>그룹 지역구</label>
              <select
                name="region"
                value={selectData}
                onChange={(e) => setSelectData(e.target.value)}
              >
                <option value="">자치구 선택</option>
                {Object.keys(seoulDistricts).map((region) => (
                  <option key={region} value={region}>
                    {seoulDistricts[region]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>그룹 소개</label>
              <textarea
                name="introduction"
                placeholder="그룹 소개"
                value={textareaData}
                onChange={(e) => setTextareaData(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="gBtn">
          그룹 생성
        </button>
        <button
          type="button"
          onClick={() => {
            setIsModal(false);
          }}
          className={styles.back}
        >
          뒤로가기
        </button>
      </form>
    </div>
  );
};

export default GroupMaking;
