import React, { ChangeEvent, useState } from 'react';
import Api from '../../api';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openToast, setToastMessage } from '../../features/toastSlice';
import { CommentDataType } from '../../types/fetchDataTypes';

const CommentAdd = ({
  id,
  postId,
  isCert,
  setComments,
  IsReplyComment,
  setIsReplyCommentAddOpen,
}: {
  id: number;
  postId: number;
  isCert: boolean;
  setComments: React.Dispatch<React.SetStateAction<CommentDataType[]>>;
  IsReplyComment: boolean;
  setIsReplyCommentAddOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await Api.post(
        `/comment/${id}${isCert ? '' : '?cert=true'}`,
        { content: content },
      );
      if (res.data === '게시글을 찾을 수 없') {
        alert('잘못된 접근입니다.');
        return;
      }

      setComments((prevComments) => [...prevComments, res.data]);
      setContent('');
      dispatch(setToastMessage('댓글이 생성되었습니다.'));
      dispatch(openToast());
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentAddClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (!setIsReplyCommentAddOpen) {
      return;
    }
    try {
      console.log('대댓글');
      const res = await Api.post(`/comment/${postId}?cert=true`, {
        parentId: id,
        content,
      });
      if (res.data === '게시글을 찾을 수 없') {
        alert('잘못된 접근입니다.');
        setIsReplyCommentAddOpen(false);
        return;
      }
      setComments((prevComments) => [...prevComments, res.data]);
      setContent('');
      dispatch(setToastMessage('답글이 생성되었습니다.'));
      dispatch(openToast());
      setIsReplyCommentAddOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.commentAdd}>
      {postId && <div>ㄴ</div>}
      <input
        placeholder={
          postId
            ? `@${id}님에게 보낼 답글을 입력해주세요.`
            : '댓글을 입력해주세요.'
        }
        type="text"
        value={content}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setContent(e.target.value);
        }}
      />
      <button
        className="gBtn"
        onClick={IsReplyComment ? handleCommentAddClick : handleClick}
      >
        +
      </button>
    </div>
  );
};

export default CommentAdd;
