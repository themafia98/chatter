import clsx from "clsx";
import Control from "../Control/Control";
import classes from "./ChatControls.module.css";

const ChatControls = () => {

  const handleSendMessage = () => {};
  
  return (
    <div className={classes.chatControls}>
      <textarea 
        placeholder="Type a message here"
        className={classes.text}>
      </textarea>
      <Control 
        onClick={handleSendMessage}
        className={clsx(classes.chatControl, classes.controlSendMessage)}
      >
        <span>Send</span>
      </Control>
    </div>
  );

}

export default ChatControls;