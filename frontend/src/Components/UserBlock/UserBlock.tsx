import ChevronDown from '../ChevronDown/ChevronDown';
import classes from './UserBlock.module.css';
import maleAvatar from './avatars/male_user.png';
import { MouseEvent, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { AppStore, User } from '../../Interfaces';

const UserBlock = (): ReactElement => {
  const user: User | null = useSelector(state => {
    const { appReducer } = state as Record<string, AppStore>;
    return appReducer.system.user;
  });

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
        <p className={classes.username}>{user?.name || 'Undefined name'}</p>
        <ChevronDown />
      </div>
    </div>
  );
};

export default UserBlock;