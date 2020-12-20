import ChevronDown from "../ChevronDown/ChevronDown";
import classes from "./UserBlock.module.css";
import maleAvatar from "./avatars/male_user.png";

const UserBlock = () => {
  const handleClick = () => {};

  return (
    <div className={classes.userBlock}>
      <div
        style={{ backgroundImage: `url(${maleAvatar})` }}
        className={classes.userAvatar}
      />
      <div
        role="button"
        aria-hidden
        onClick={handleClick}
        className={classes.userInform}
      >
        <p className={classes.username}>Henry Jabbawockiez</p>
        <ChevronDown />
      </div>
    </div>
  );
};

export default UserBlock;
