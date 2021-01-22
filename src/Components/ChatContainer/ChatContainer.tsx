import ChatBody from '../ChatBody/ChatBody';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatControls from '../ChatControls/ChatControls';
import classes from './ChatContainer.module.css';
import { ReactElement } from 'react';

type ChatContainerProps = {
  activeChatId: string | null;
};

const ChatContainer = ({
  activeChatId,
}: ChatContainerProps): ReactElement | null => {
  if (activeChatId === null) {
    return null;
  }

  return (
    <div className={classes.chatContainer}>
      <ChatHeader />
      <ChatBody />
      <ChatControls />
    </div>
  );
};
export default ChatContainer;