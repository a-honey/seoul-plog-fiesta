import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRequestListOpen: false,
  isGroupRequestListOpen: false,
};

const relationSlice = createSlice({
  name: 'relation',
  initialState,
  reducers: {
    toggleRequestList: (state) => {
      state.isRequestListOpen = !state.isRequestListOpen;
    },
    toggleGroupRequestList: (state) => {
      state.isGroupRequestListOpen = !state.isGroupRequestListOpen;
    },
  },
});

export const { toggleRequestList, toggleGroupRequestList } = relationSlice.actions;

export default relationSlice.reducer;