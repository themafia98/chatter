import ChatBody from '../ChatBody/ChatBody';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatControls from '../ChatControls/ChatControls';
import classes from './ChatContainer.module.css';
import { ReactElement } from 'react';

type ChatContainerProps = {
  chatId: string | null;
};

const ChatContainer = ({ chatId }: ChatContainerProps): ReactElement | null => {
  if (chatId === null) return null;

  return (
    <div className={classes.chatContainer}>
      <ChatHeader chatId={chatId} />
      <ChatBody />
      <ChatControls />
    </div>
  );
};

export default ChatContainer;
