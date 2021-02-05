import { ChatForm } from '../Interfaces';
import { Chat } from '../Types';

export const createRoom = (formData: ChatForm): Chat => ({
  id: Math.random(),
  chat_id: `${Math.random()}`,
  chatType: formData.chatType,
  usersIds: formData.usersIds,
});