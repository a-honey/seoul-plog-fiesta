import React, { ChangeEvent, useContext, useState } from 'react';
import styles from './index.module.scss';
import * as Api from '../../api';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openToast, setToastMessage } from '../../features/toastSlice';
import { NoticePostType } from '../../types/fetchDataTypes';

const Writing = ({
  setIsModalOpen,
  setDatas,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDatas: React.Dispatch<React.SetStateAction<NoticePostType[]>>;
}) => {
  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const { groupId } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isNotice: false,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const isChecked = (event.target as HTMLInputElement).checked;
      setFormData((prevData) => ({
        ...prevData,
        [name]: isChecked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await Api.post(`/group/post/${groupId}`, formData);
      setIsModalOpen(false);
      setDatas((datas) => [...datas, res.data]);
      dispatch(setToastMessage('인증글이 생성되었습니다.'));
      dispatch(openToast());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <form className={styles.plogging} onSubmit={handleSubmit}>
        <h1>게시글 작성하기</h1>
        <div className="container">
          <div className={styles.content}>
            <label>제목</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <div className={styles.check}>
              <input
                type="checkbox"
                name="isNotice"
                checked={formData.isNotice}
                onChange={handleInputChange}
              />
              <span>공지사항으로 하기</span>
            </div>
            <label>설명</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.btns}>
          <button className="gBtn" type="submit">
            작성하기
          </button>
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="gBtn"
          >
            뒤로가기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Writing;
