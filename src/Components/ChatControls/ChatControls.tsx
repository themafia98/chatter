import clsx from 'clsx';
import { ChangeEvent, ChangeEventHandler, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Control from '../Control/Control';
import classes from './ChatControls.module.css';
import { v4 as uuid } from 'uuid';
import { Message } from '../../Types';
import { addMessage } from '../../redux/chatReducer/chatReducer.slice';
import { ChatStore } from '../../Interfaces';

const ChatControls = (): ReactElement => {
  const [content, setContent] = useState<string>('');
  const dispatch = useDispatch();

  const messages = useSelector((state: ChatStore) => state.messages);

  const handleSendMessage = () => {
    const message: Message = {
      id: messages?.length || 1,
      chat_id: uuid(),
      id_message: uuid(),
      author_id: uuid(),
      content,
      timestamp: moment().format('DD.MM.YYYY hh:mm:ss'),
    };

    dispatch(addMessage(message));
  };

  const handleChangeContent: ChangeEventHandler = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => setContent(target.value);

  return (
    <div className={classes.chatControls}>
      <textarea
        onChange={handleChangeContent}
        placeholder="Type a message here"
        className={classes.text}
        value={content}></textarea>
      <Control
        onClick={handleSendMessage}
        className={clsx(classes.chatControl, classes.controlSendMessage)}>
        <span>Send</span>
      </Control>
    </div>
  );
};

export default ChatControls;