import { useState } from 'react';
import * as Api from '../../api';
import styles from './index.module.scss';

const CommentAdd = ({
  id,
  postId,
  isCert,
  setComments,
  isComment,
  setCommentTow,
}) => {
  const [data, setData] = useState();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log('댓글');
    try {
      const res = await Api.post(
        `/comment/${id}${isCert ? '' : '?cert=true'}`,
        { content: data },
      );
      if (res.data === '게시글을 찾을 수 없') {
        alert('잘못된 접근입니다.');
        return;
      }

      alert('댓글 작성 성공');
      setComments((prevComments) => [...prevComments, res.data]);
      setData('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentAddClick = async (e) => {
    e.preventDefault();
    try {
      console.log('대댓글');
      const res = await Api.post(`/comment/${postId}?cert=true`, {
        parentId: id,
        content: data,
      });
      if (res.data === '게시글을 찾을 수 없') {
        alert('잘못된 접근입니다.');
        return;
      }
      alert('댓글 작성 성공');
      setComments((prevComments) => [...prevComments, res.data]);
      setData('');
      console.log(setCommentTow);
      setCommentTow(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.commentAdd}>
      <textarea
        type="text"
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
      <button
        className="gBtn"
        onClick={isComment ? handleCommentAddClick : handleClick}
      >
        +
      </button>
    </div>
  );
};

export default CommentAdd;
