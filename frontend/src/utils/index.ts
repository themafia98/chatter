import { ChatForm } from '../Interfaces';
import { Chat } from '../Types';

export const createRoom = (formData: ChatForm): Chat => ({
  id: Math.random(),
  bucket: '131232321',
  chat_id: `${Math.random()}`,
  usersIds: formData.usersIds,
});