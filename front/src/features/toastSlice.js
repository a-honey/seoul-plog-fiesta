import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isToastOpen: false,
  toastMessage: '',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
      openToast: (state) => {
        state.isToastOpen = true;
      },
    setToastMessage: (state, action) => {
      state.toastMessage = action.payload;
    },
    closeToast: (state) => {
      state.isToastOpen = false;
      state.toastMessage = '';
    },
  },
});

export const { openToast, setToastMessage, closeToast } = toastSlice.actions;

export default toastSlice.reducer;
