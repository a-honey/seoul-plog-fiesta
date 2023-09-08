import styles from './index.module.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeToast } from '../../features/toastSlice';
import { RootState } from '../../store';

const Modal = () => {
  const { toastMessage } = useSelector((state: RootState) => state.toast);

  const dispatch = useDispatch();

  useEffect(() => {
    const toast = setTimeout(() => {
      dispatch(closeToast());
    }, 2000);

    return () => clearTimeout(toast);
  });

  return (
    <div className={styles.toastModal}>
      <div>
        <button onClick={() => dispatch(closeToast())}>X</button>
        {toastMessage}
      </div>
    </div>
  );
};

export default Modal;
