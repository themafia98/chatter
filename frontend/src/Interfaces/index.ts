import { Chat, Message, ChatType } from '../Types';

export interface User {
  id: number;
  id_user: string;
  name: string;
}

export interface PrivateUser extends User {
  password: string;
  token: string;
}

export interface ChatStore {
  chats: Array<Chat> | null;
  active_chat_id: string | null;
  messages: Array<Message> | null;
  chatType: ChatType;
}

export interface AppStore {
  system: { user: null | User };
  users: Array<User> | null;
  search: { value?: string };
}

export interface ChatForm {
  roomName: string;
  chatType: ChatType;
  usersIds: string[];
}