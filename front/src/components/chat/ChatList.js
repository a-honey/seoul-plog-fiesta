import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import * as Api from '../../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../pages/Layout';
import { openChat, setChatId, setChatNickName } from '../../features/chatSlice';

const ChatList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [messages, setMessages] = useState([]);

  const { loginId } = useSelector((state) => state.user);
  const { isChatOpen } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const handleInputChange = async (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    try {
      const res = await Api.get(`/user/${newSearchText}`);
      setSearchResult(res.data.searchNickname);
    } catch (err) {
      console.log(
        '이름 검색데이터를 불러오는데 실패.',
        err.response.data.message,
      );
    }
  };

  useEffect(() => {
    socket.emit('initialize', loginId);

    socket.on('messages', (messages) => {
      setMessages(messages);
    });
  }, [loginId]);

  return (
    <div className={styles.chatList}>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="유저의 별명을 검색하세요"
      />
      {searchResult && <UserItem data={searchResult} />}
      {messages.length === 0 || !messages ? (
        <div>새로운 채팅을 시작하세요</div>
      ) : (
        messages.map((data) => <Item data={data} />)
      )}
    </div>
  );
};

export default ChatList;

const Item = ({ data }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setChatId(data.senderId));
    dispatch(setChatNickName(data.senderId));
    dispatch(openChat());
  };

  return (
    <div onClick={handleClick}>
      <div>{data.senderId}님과의 채팅</div>
      <div>{data.message}</div>
    </div>
  );
};

const UserItem = ({ data }) => {
  const navigator = useNavigate();

  return (
    <div className={styles.userItem}>
      <div
        onClick={() => {
          navigator(`/users/${data.id}?view=main`);
        }}
      >
        {data.nickname}
      </div>
    </div>
  );
};
