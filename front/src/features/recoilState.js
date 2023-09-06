import { atom } from 'recoil';

export const isChatOpenState = atom({
  key: 'isChatOpen',
  default: false,
});

export const isChatWiState = atom({
  key: 'chatId',
  default: 0,
});