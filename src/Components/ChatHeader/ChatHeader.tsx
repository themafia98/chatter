import classes from './ChatHeader.module.css';
import avatar from './avatar.jpg';
import Control from '../Control/Control';
import { MouseEvent, ReactElement } from 'react';

const ChatHeader = (): ReactElement => {
  const handleFileControl = (e: MouseEvent) => {
    e.stopPropagation();
  };
  const handleOpenOptions = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={classes.chatHeader}>
      <div className={classes.headerIconWrapper}>
        <div
          style={{ backgroundImage: `url(${avatar})` }}
          className={classes.avatar}
          />
      </div>
      <div className={classes.userWrapper}>
        <div>
          <div className={classes.userName}>Luy Robin</div>
          <div className={classes.userStatus}>last online 5 min ago</div>
        </div>
        <div className={classes.controls}>
          <Control onClick={handleFileControl}>
            <span>File</span>
          </Control>
          <Control onClick={handleOpenOptions}>
            <span>Opt</span>
          </Control>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;