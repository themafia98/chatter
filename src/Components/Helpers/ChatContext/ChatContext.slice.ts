import { ChatStore } from '../../../Interfaces';
import { Action } from '../../../Types';
import { ADD_MESSAGE } from './Chat.constant';

export const initialState: ChatStore = {
  chats: null,
  active_chat_id: null,
  users: null,
  messages: null,
};

export const reducer = (state: ChatStore, action: Action): ChatStore => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages:
          state.messages !== null
            ? [...state.messages, action.payload]
            : [action.payload],
      };
    default:
      return state;
  }
};