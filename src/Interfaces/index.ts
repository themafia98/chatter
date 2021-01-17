import { Chat, Message } from '../Types';

export interface User {
  id: number;
  id_user: string;
  name: string;
  create_date: string;
}

export interface PrivateUser extends User {
  password: string;
  token: string;
}

export interface ChatStore {
  chats: Array<Chat> | null;
  active_chat_id: string | null;
  messages: Array<Message> | null;
}

export interface AppStore {
  system: { user: null | User };
  users: Array<User> | null;
  search: { value?: string };
}