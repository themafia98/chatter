import clsx from 'clsx';
import { MouseEvent, ReactElement } from 'react';
import Control from '../Control/Control';
import classes from './ChatControls.module.css';

const ChatControls = (): ReactElement => {
  const handleSendMessage = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={classes.chatControls}>
      <textarea
        placeholder="Type a message here"
        className={classes.text}></textarea>
      <Control
        onClick={handleSendMessage}
        className={clsx(classes.chatControl, classes.controlSendMessage)}>
        <span>Send</span>
      </Control>
    </div>
  );
};

export default ChatControls;
