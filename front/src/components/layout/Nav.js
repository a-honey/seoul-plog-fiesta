import { Link, useLocation } from 'react-router-dom';
import { BiSolidHome } from 'react-icons/bi';
import { FaUserFriends, FaAward, FaWalking } from 'react-icons/fa';
import styles from './layout.module.scss';
import { useEffect, useState } from 'react';
import ChatList from '../chat/ChatList';
import Chat from '../chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { closeChat } from '../../features/chatSlice';
import { socket } from '../../pages/Layout';

const Nav = () => {
  const location = useLocation(); // 현재 URL 정보를 가져오는 hook
  const [isOpen, setIsOpen] = useState(false);

  const { isChatOpen } = useSelector((state) => state.chat);

  const navItems = [
    { to: '/?view=main', icon: <BiSolidHome /> },
    { to: '/network?view=group', icon: <FaUserFriends /> },
    { to: '/ranking?view=main', icon: <FaAward /> },
    { to: '/recommend', icon: <FaWalking /> },
  ];

  const user = useSelector((state) => state.user);
  const token = localStorage.getItem('userToken');
  const isLogin = user.email && token;

  const [isNewMessage, setIsNewMessage] = useState(false);
  const dispatch = useDispatch();

  const handleNotLogin = () => {
    alert('로그인을 해주세요');
    return;
  };

  useEffect(() => {
    if (socket) {
      socket.emit('initialize', user.loginId, () => {});

      socket.on('messages', () => {
        setIsNewMessage(true);
      });

      socket.on('newMessage', () => {
        setIsNewMessage(true);
      });
    }
  }, [user]);

  return (
    <div className={styles.LeftNav}>
      <nav className={styles.LeftNavContainer}>
        {isLogin
          ? navItems.map((item) => (
              <Link
                to={item.to}
                className={
                  location.pathname === item.to.split('?')[0]
                    ? styles.active
                    : styles.just
                }
                key={item.to}
              >
                <div className={styles.icon}>{item.icon}</div>
                <div className={styles.text}>
                  {item.to === '/?view=main'
                    ? 'home'
                    : item.to.split('?')[0].split('/')[1]}
                </div>
              </Link>
            ))
          : navItems.map((item) => (
              <div className={styles.just} onClick={handleNotLogin}>
                <div className={styles.icon}>{item.icon}</div>
                <div className={styles.text}>
                  {item.to === '/?view=main'
                    ? 'home'
                    : item.to.split('?')[0].split('/')[1]}
                </div>
              </div>
            ))}
      </nav>
      {isOpen && <ChatList />}
      {isChatOpen && <Chat />}
      {isLogin &&
        (isChatOpen ? (
          <button
            className="gBtn"
            onClick={() => {
              dispatch(closeChat());
            }}
          >
            Quit
          </button>
        ) : (
          <button
            className={`gBtn ${styles.chatBtn}`}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isNewMessage && <div></div>}
            채팅목록
          </button>
        ))}
    </div>
  );
};

export default Nav;
