import clsx from "clsx";
import { useEffect, useMemo, useRef } from "react";
import classes from "./ChatBody.module.css";

const ChatBody = () => {

  const chatBodyRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {

    if (!chatBodyRef.current) {
      return;
    }

    chatBodyRef.current.scrollTo(0, chatBodyRef.current.scrollHeight);

  }, [chatBodyRef]);

  const messageList = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => (
      <div className={clsx(classes.message, i % 2 === 0 && classes.mineMessage)}> 
        Message {i} Message {i}
        Message {i} Message {i}
        Message {i} Message {i}
        Message {i} Message {i}
      </div>
    ))
  , []);

  return (
    <div
      ref={chatBodyRef}
      className={classes.chatBody}
    >
      {messageList}
    </div>
  );
};

export default ChatBody;
