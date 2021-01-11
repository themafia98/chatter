import { MouseEventHandler, ReactElement, useCallback } from 'react';
import Message from '../Message/Message';
import classes from './MessagesList.module.css';

type MessagesListProps = {
  onSelectChat: (id: string) => void;
};

const MessagesList = ({ onSelectChat }: MessagesListProps): ReactElement => {
  const createHandleSelectChat = useCallback(
    (id: string): MouseEventHandler => () => onSelectChat(id),
    [onSelectChat]
  );

  return (
    <div className={classes.messagesList}>
      {Array.from({ length: 10 }, (_, i) => 
        <Message onClick={createHandleSelectChat(`${i}`)} key={i}>
          {`Message ${i}`}
        </Message>
      )}
    </div>
  );
};

export default MessagesList;
