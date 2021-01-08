import Message from "../Message/Message";
import classes from "./MessagesList.module.css";

const MessagesList = () => (
  <div className={classes.messagesList}>
    {Array.from({length: 10}, (_, i) => <Message key={i}>
    MessageMessageMessageMessageMessageMessageMessageMessageMessage
    MessageMessageMessageMessageMessageMessageMessageMessageMessage
    MessageMessageMessageMessageMessageMessageMessageMessageMessage
    MessageMessageMessageMessageMessageMessageMessageMessageMessage
    </Message>)}
  </div>
);

export default MessagesList;