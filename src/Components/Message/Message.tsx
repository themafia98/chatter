import { MouseEventHandler, ReactElement } from 'react';
import classes from './Message.module.css';
import avatar from './avatar.jpg';
import clsx from 'clsx';

type MessageProps = {
  children: string | ReactElement;
  onClick: MouseEventHandler;
  isActive: boolean;
};

const Message = ({
  children,
  onClick,
  isActive,
}: MessageProps): ReactElement => 
  <div
    onClick={onClick}
    className={clsx(classes.message, isActive && classes.isActive)}>
    <div className={classes.header}>
      <div className={classes.headerIconWrapper}>
        <div
          style={{ backgroundImage: `url(${avatar})` }}
          className={classes.avatar}
          />
      </div>
      <div className={classes.userWrapper}>
        <div className={classes.userInfo}>
          <div className={classes.userName}>Luy Robin</div>
          <div className={clsx(classes.messageStatus, 'text--white')}>
            writes...
          </div>
        </div>
        <div className={clsx(classes.userStatus, 'text--white')}>1 min ago</div>
      </div>
    </div>
    <div className={clsx(classes.content, 'text--white')}>{children}</div>
  </div>
;
export default Message;