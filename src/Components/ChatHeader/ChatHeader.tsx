import classes from "./ChatHeader.module.css";
import avatar from "./avatar.jpg";
import Control from "../Control/Control";
import { MouseEvent } from "react";

type ChatHeaderProps = {
    chatId: string;
}

const ChatHeader = ({ chatId }: ChatHeaderProps) => {

  const handleFileControl = (e: MouseEvent) => {};
  const handleOpenOptions = (e: MouseEvent) => {};
  
  return (
      <div className={classes.chatHeader}>
        <div className={classes.headerIconWrapper}>
          <div style={{ backgroundImage: `url(${avatar})` }}  className={classes.avatar} />
        </div>
        <div className={classes.userWrapper}>
          <div>
            <div className={classes.userName}>Luy Robin {chatId}</div>
            <div className={classes.userStatus}>last online {5 + +chatId} min ago</div>
          </div>  
          <div className={classes.controls}>
            <Control onClick={handleFileControl}><span>File</span></Control>
            <Control onClick={handleOpenOptions}><span>Opt</span></Control>
          </div>
        </div>
      </div>
  );
}

export default ChatHeader;