import { MouseEventHandler, useCallback } from "react";
import Message from "../Message/Message";
import classes from "./MessagesList.module.css";

type MessagesListProps = {
  onSelectChat: Function;
}

const MessagesList = ({ onSelectChat }: MessagesListProps) => {

  const createHandleSelectChat = useCallback((id: string): MouseEventHandler => () =>
    onSelectChat(id)
  , [onSelectChat]);
  
  return (
    <div className={classes.messagesList}>
      {Array.from({length: 10}, (_, i) => <Message onClick={createHandleSelectChat(`${i}`)} key={i}>
      {`Message ${i}`}
      </Message>)}
    </div>
  );

}

export default MessagesList;