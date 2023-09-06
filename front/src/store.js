import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import toastReducer from './features/toastSlice';
import relationReducer from './features/relationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    relation: relationReducer,
  },
});

/*

/src/page
import { useDispatch } from 'react-redux'
const dispatch = useDispatch();
dispatch(login({ email: 'hi@gmail.com', pw: 'mypasswrod'}))

>> 해당 email, pw을 확인하고 email, nickname를 반환함 => state에 저장함
*/
