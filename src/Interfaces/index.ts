import { Chat, Message, User } from '../Types';

export interface ChatStore {
  chats: Array<Chat> | null;
  active_chat_id: string | null;
  messages: Array<Message> | null;
  users: Array<User> | null;
}