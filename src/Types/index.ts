export type User = {
  id: number;
  id_user: string;
  name: string;
  create_date: string;
};

export type Chat = {
  id: number;
  bucket?: string;
  chat_id: string;
  sender_id: Pick<User, 'id_user'> | string;
  recipient_id: Pick<User, 'id_user'> | string;
};

export type Message = {
  id: number;
  chat_id: Pick<Chat, 'chat_id'> | string;
  id_message: string;
  author_id: Pick<User, 'id_user'> | string;
  content: string;
  timestamp: string;
};