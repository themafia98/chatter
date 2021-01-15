import { ChatStore } from '../../Interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../Types';

const initialState: ChatStore = {
  chats: null,
  active_chat_id: null,
  users: null,
  messages: null,
};

const chatReducer = createSlice({
  name: 'chatReducer',
  initialState,
  reducers: {
    addMessage: {
      reducer: (state, { payload }: PayloadAction<Message>) => {
        state.messages =
          state.messages !== null ? [...state.messages, payload] : [payload];
      },
      prepare: (message: Message) => ({ payload: message }),
    },
    deleteMessage: {
      reducer: (state, { payload }: PayloadAction<string>) => {
        const { messages } = state;

        if (messages === null) {
          return;
        }

        state.messages = messages.filter(
          (message: Message) => message.id_message !== payload
        );
      },
      prepare: (id: string) => ({ payload: id }),
    },
  },
});

export const { addMessage, deleteMessage } = chatReducer.actions;

export default chatReducer.reducer;