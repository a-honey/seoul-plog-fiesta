import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './features/userSlice';
import toastReducer, { ToastState } from './features/toastSlice';
import relationReducer, { RelationState } from './features/relationSlice';
import chatSlice, { ChatState } from './features/chatSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    relation: relationReducer,
    chat: chatSlice,
  },
});

export type RootState = {
  user: UserState;
  toast: ToastState;
  relation: RelationState;
  chat: ChatState;
};

/*

/src/page
import { useDispatch } from 'react-redux'
const dispatch = useDispatch();
dispatch(login({ email: 'hi@gmail.com', pw: 'mypasswrod'}))

>> 해당 email, pw을 확인하고 email, nickname를 반환함 => state에 저장함
*/
