import clsx from 'clsx';
import { ReactElement, useEffect, useMemo, useRef } from 'react';
import { DefaultRootState, useSelector } from 'react-redux';
import { ChatStore } from '../../Interfaces';
import { Message } from '../../Types';
import DoneIcon from '../DoneIcon/DoneIcon';
import classes from './ChatBody.module.css';

const ChatBody = (): ReactElement => {
  const chatBodyRef = useRef<null | HTMLDivElement>(null);

  const messages = useSelector((state: DefaultRootState) => {
    const { chatReducer } = state as Record<string, ChatStore>;
    return chatReducer.messages;
  });

  useEffect(() => {
    if (!chatBodyRef.current) {
      return;
    }

    chatBodyRef.current.scrollTo(0, chatBodyRef.current.scrollHeight);
  }, [chatBodyRef]);

  const messageList = useMemo(
    () =>
      messages?.map((message: Message) => 
        <div
          className={clsx(
            classes.messageWrapper,
            message.author_id === 'user_id' && classes.mine
          )}
          key={message.id_message}>
          <div
            className={clsx(
              classes.message,
              message.author_id === 'user_id' && classes.mineMessage
            )}>
            {message.content}
          </div>
          <DoneIcon size="16" color="#B7BDCB" />
        </div>
      ),
    [messages]
  );

  return (
    <div ref={chatBodyRef} className={classes.chatBody}>
      {messageList}
    </div>
  );
};

export default ChatBody;