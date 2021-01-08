import ChatBody from "../ChatBody/ChatBody";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatControls from "../ChatControls/ChatControls";
import classes from "./ChatContainer.module.css";

type ChatContainerProps = {
    chatId: string | null;
}

const ChatContainer = ({ chatId }: ChatContainerProps) => {
  
  if (chatId === null) return null;

    return (
        <div className={classes.chatContainer}>
            <ChatHeader chatId={chatId} />
            <ChatBody />
            <ChatControls />
        </div>
    );
};

export default ChatContainer;