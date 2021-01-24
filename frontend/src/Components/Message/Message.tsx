import { MouseEventHandler, ReactElement } from 'react';
import classes from './Message.module.css';
import avatar from './avatar.jpg';
import clsx from 'clsx';
import { AppStore } from '../../Interfaces';
import { useSelector } from 'react-redux';

type MessageProps = {
  children: string;
  onClick: MouseEventHandler;
  isActive: boolean;
  shouldHighlight: boolean;
};

const Message = ({
  children,
  onClick,
  isActive,
  shouldHighlight,
}: MessageProps): ReactElement => {
  const searchValue = useSelector(state => {
    const { appReducer } = state as Record<string, AppStore>;
    const { value: searchValue = '' } = appReducer.search;

    return searchValue;
  });

  let content: string | ReactElement = children;

  if (shouldHighlight) {
    const string = children.split('').map((string, index) => 
      <span
        key={`${index}-${string}`}
        className={clsx(
          searchValue.toLowerCase().includes(string.toLowerCase()) &&
            classes.highlight
        )}>
        {string}
      </span>
    );

    content = <div>{string}</div>;
  }

  return (
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
          <div className={clsx(classes.userStatus, 'text--white')}>
            1 min ago
          </div>
        </div>
      </div>
      <div className={clsx(classes.content, 'text--white')}>{content}</div>
    </div>
  );
};
export default Message;