import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Nav from '../components/layout/Nav';
import Plogging from '../components/common/Plogging';
import Toast from '../components/common/Toast';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const [isWriting, setIsWriting] = useState(false);
  const { isToastOpen } = useSelector((state) => state.toast);

  return (
    <>
      <Header setIsWriting={setIsWriting} />
      <Nav />
      {isToastOpen && <Toast />}
      {isWriting && <Plogging setIsWriting={setIsWriting} />}
      {children}
    </>
  );
};

export default Layout;
