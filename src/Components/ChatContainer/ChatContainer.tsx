import ChatBody from '../ChatBody/ChatBody';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatControls from '../ChatControls/ChatControls';
import classes from './ChatContainer.module.css';
import { ReactElement } from 'react';

const ChatContainer = (): ReactElement | null => 
  <div className={classes.chatContainer}>
    <ChatHeader />
    <ChatBody />
    <ChatControls />
  </div>
;

export default ChatContainer;