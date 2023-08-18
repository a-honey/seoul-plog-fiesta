import { Link } from 'react-router-dom';
import styles from './layout.module.scss';

const Header = ({ isModalOpen, setIsModalOpen }) => {
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div>로고이미지</div>
        <div>logo</div>
      </div>
      <nav className={styles.navContainer}>
        <button onClick={openModal}>인증하러가기</button>
        <Link to="/mypage">
          <button>마이 페이지</button>
        </Link>
        <Link to="/login">
          <button>로그인</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;