import { User } from '../Interfaces';

export type Chat = {
  id: number;
  chat_id: string;
  chatType: ChatType;
  usersIds?: string[];
};

export type Message = {
  id: number;
  chat_id: Pick<Chat, 'chat_id'> | string;
  id_message: string;
  author_id: Pick<User, 'id_user'> | string;
  content: string;
  timestamp: string;
};

export type LoginData = {
  password: string;
  login: string;
};

export type ChatType = 'common' | 'tasks';