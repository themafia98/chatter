import { Chat, Message, User } from '../Types';

export interface ChatStore {
  chats: Array<Chat> | null;
  active_chat_id: string | null;
  messages: Array<Message> | null;
}

export interface AppStore {
  users: Array<User> | null;
  search: { value?: string };
}