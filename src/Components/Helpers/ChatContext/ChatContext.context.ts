import { createContext, Dispatch } from 'react';
import { ChatStore } from '../../../Interfaces';
import { Action } from '../../../Types';

export const ChatStoreContext = createContext<ChatStore | null>(null);

export const ChatDispatcherContext = createContext<Dispatch<Action>>(
  () => null
);