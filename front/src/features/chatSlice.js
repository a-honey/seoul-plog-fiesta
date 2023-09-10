import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChatOpen: false,
  chatId: null,
  chatRoomName: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openChat: (state) => {
      state.isChatOpen = true;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setChatRoomName: (state, action) => {
      state.chatRoomName = action.payload;
    },
    closeChat: (state) => {
      state.isChatOpen = false;
      state.chatId = null;
      state.chatRoomName = '';
    },
  },
});

export const { openChat, setChatId, setChatRoomName, closeChat } =
  chatSlice.actions;

export default chatSlice.reducer;
