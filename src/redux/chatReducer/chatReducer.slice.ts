import { ChatStore } from '../../Interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, Message } from '../../Types';

const initialState: ChatStore = {
  chats: null,
  active_chat_id: null,
  messages: null,
};

const chatReducer = createSlice({
  name: 'chatReducer',
  initialState,
  reducers: {
    addMessage: {
      reducer: (state: ChatStore, { payload }: PayloadAction<Message>) => {
        state.messages =
          state.messages !== null ? [...state.messages, payload] : [payload];
      },
      prepare: (message: Message) => ({ payload: message }),
    },
    clearMessages: {
      reducer: (state: ChatStore) => {
        state.messages = [];
      },
      prepare: () => ({ payload: null }),
    },
    setChatId: {
      reducer: (state, { payload }: PayloadAction<string>) => {
        state.active_chat_id = payload;
      },
      prepare: (chatId: string) => ({ payload: chatId }),
    },
    loadChats: {
      reducer: (state, { payload }: PayloadAction<Array<Chat>>) => {
        state.chats = payload;
      },
      prepare: (chats: Array<Chat>) => ({ payload: chats }),
    },
  },
});

export const {
  addMessage,
  clearMessages,
  setChatId,
  loadChats,
} = chatReducer.actions;

export default chatReducer.reducer;