import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeChat } from '../../features/chatSlice';

let socket;
let roomName;

function Chat() {
  console.log('hello, websoket:D');

  const [messages, setMessages] = useState([]); // 받은 채팅 메시지를 저장함
  const [messageText, setMessageText] = useState(''); // 메시지 input값을 저장

  const userToken = localStorage.getItem('userToken');

  const user = useSelector((state) => state.user);
  const { chatId } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    // 해당 소켓을 저장
    socket = io.connect('ws://localhost:3001', {
      path: '/chat',
      extraHeaders: {
        Authorization: `Bearer ${userToken}`, // JWT 토큰을 전달
      },
    });

    // 웹 소켓을 연결함
    socket.on('connect', () => {
      console.log('소켓이 연결되었습니다.');
      // 백에 상대방의 id를 전달하여 RoomID 찾기 혹은 생성 후 입장 및 roomName 저장
      socket.emit('joinRoom', chatId, (roomId) => {
        roomName = roomId;
      });
    });

    socket.on('connect_error', (error) => {
      console.log('소켓 연결 에러:', error);
    });

    socket.on('error', (error) => {
      console.log('소켓 에러:', error);
    });

    socket.on('disconnect', (reason) => {
      console.log('소켓이 연결이 끊어졌습니다. 사유:', reason);
    });

    // 백에서 초기 메시지를 받아옴
    socket.on('messages', (receivedMessages) => {
      try {
        console.log('초기 메시지: ', receivedMessages);
        setMessages(receivedMessages);
      } catch (error) {
        console.log('Error in messages event:', error);
      }
    });

    // 백에서 다른 유저의 새로운 메시지를 받음
    socket.on('message', (newMessage) => {
      try {
        console.log('보낸 메시지: ', newMessage);
        // 기존 메시지리스트에 받은 메시지를 추가함
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.log('Error in message event:', error);
      }
    });

    // 다른 유저가 입장했을 때 입장 메시지를 받음(DB에 저장하지 않음)
    socket.on('other_enter', (userId) => {
      try {
        setMessages((prevMessages) => [
          ...prevMessages,
          `${userId}님이 입장했습니다.`,
        ]);
      } catch (error) {
        console.log('Error in message event:', error);
      }
    });
  }, [userToken, chatId]);

  // 클라에서 메시지를 전송하는 함수
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!messageText.trim()) return; // 빈 메시지면 종료함

    // 메시지를 서버에 전송
    try {
      // input.value 초기화를 위한 메시지 임시 보관
      const value = messageText;
      console.log('백으로 보내는 메시지: ', value);
      await socket.emit('sendMessage', chatId, value);
      setMessages((prevMessages) => [...prevMessages, `나: ${value}`]);
      setMessageText('');
    } catch (err) {
      console.log('메시지 보내기 실패', err.response.data.message);
    }
  };

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', chatId);
  };

  return (
    <div className={styles.chat}>
      <h1>{roomName}님과의 채팅방</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.senderId === user.loginId
              ? '나의 메시지: '
              : `${chatId}의 메시지: `}
            {message.message}
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button className="gBtn">전송</button>
          <button
            type="button"
            className="gBtn"
            onClick={() => {
              handleLeaveRoom();
              dispatch(closeChat());
            }}
          >
            뒤로가기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
