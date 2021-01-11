import ChevronDown from '../ChevronDown/ChevronDown';
import classes from './UserBlock.module.css';
import maleAvatar from './avatars/male_user.png';
import { MouseEvent, ReactElement } from 'react';

const UserBlock = (): ReactElement => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={classes.userBlock}>
      <div
        style={{ backgroundImage: `url(${maleAvatar})` }}
        className={classes.userAvatar}
        />
      <div
        role="button"
        aria-hidden={true}
        onClick={handleClick}
        className={classes.userInform}>
        <p className={classes.username}>Henry Jabbawockiez</p>
        <ChevronDown />
      </div>
    </div>
  );
};

export default UserBlock;
