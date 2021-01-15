import { Action, Message } from '../../../Types';
import { ADD_MESSAGE } from './Chat.constant';

export const addMessage = (payload: Message): Action => ({
  type: ADD_MESSAGE,
  payload,
});