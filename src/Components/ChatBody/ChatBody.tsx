import clsx from 'clsx';
import { Fragment, ReactElement, useEffect, useMemo, useRef } from 'react';
import DoneIcon from '../DoneIcon/DoneIcon';
import classes from './ChatBody.module.css';

const ChatBody = (): ReactElement => {
  const chatBodyRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!chatBodyRef.current) {
      return;
    }

    chatBodyRef.current.scrollTo(0, chatBodyRef.current.scrollHeight);
  }, [chatBodyRef]);

  const messageList = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => 
        <div
          className={clsx(classes.messageWrapper, i % 2 === 0 && classes.mine)}
          key={i}>
          <div
            className={clsx(
              classes.message,
              i % 2 === 0 && classes.mineMessage
            )}>
            Message {i} Message {i}
            Message {i} Message {i}
            Message {i} Message {i}
            Message {i} Message {i}
          </div>
          <DoneIcon size="16" color="#B7BDCB" />
        </div>
      ),
    []
  );

  return (
    <div ref={chatBodyRef} className={classes.chatBody}>
      {messageList}
    </div>
  );
};

export default ChatBody;