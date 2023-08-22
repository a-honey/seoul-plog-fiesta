import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { email: '', nickName: '', loginId: '' },
  reducers: {
    login(state, action) {
      //api요청 후 반환값을 state에 넣기
      //const { email, nickName } = action.payload;
      // action의 payload속성에 접근
      const { token, id, email, nickName } = action.payload;
      state.email = email;
      state.nickName = nickName;
      state.loginId = id;
      sessionStorage.setItem('userToken', token);
    },
    logout(state, action) {
      //api요청 후 state를 삭제함
      state.email = '';
      state.nickName = '';
      state.loginId = '';
      sessionStorage.removeItem('userToken');
    },
  },
});

export const { login, register, logout } = userSlice.actions;
export default userSlice.reducer;
