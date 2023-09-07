import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChatOpen: false,
  chatId: 0,
};

const chatSlice = createSlice({
  name: 'relation',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
  },
});

export const { toggleChat, setChatId } = chatSlice.actions;
export type ChatState = ReturnType<typeof chatSlice.reducer>;
export default chatSlice.reducer;
