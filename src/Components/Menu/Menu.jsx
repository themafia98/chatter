import clsx from "clsx";
import classes from "./Menu.module.css";
import homeIcon from "./icons/home.svg";
import bellIcon from "./icons/bell.svg";
import calendarIcon from "./icons/calendar.svg";
import chatIcon from "./icons/chat.svg";
import personIcon from "./icons/person.svg";
import settingsIcon from "./icons/settings.svg";

const Menu = () => (
  <menu className={classes.menuList}>
    <div className={classes.menuItem}>
      <img src={homeIcon} alt="homeIcon" />
      <span>HOME</span>
    </div>
    <div className={clsx(classes.menuItem, classes.active)}>
      <img src={chatIcon} alt="chatIcon" />
      <span>CHAT</span>
    </div>
    <div className={classes.menuItem}>
      <img src={personIcon} alt="contactIcon" />
      <span>CONTACT</span>
    </div>
    <div className={classes.menuItem}>
      <img src={bellIcon} alt="notificationsIcon" />
      <span>NOTIFICATIONS</span>
    </div>
    <div className={classes.menuItem}>
      <img src={calendarIcon} alt="calendarIcon" />
      <span>CALENDAR</span>
    </div>
    <div className={classes.menuItem}>
      <img src={settingsIcon} alt="settingsIcon" />
      <span>SETTINGS</span>
    </div>
  </menu>
);

export default Menu;
