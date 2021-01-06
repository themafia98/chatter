import ChevronDown from "../ChevronDown/ChevronDown";
import Button from "../common/Button/Button";
import PlusIcon from "../PlusIcon/PlusIcon";
import SearchBlock from "../SearchBlock/SearchBlock";
import classes from "./ChatContainer.module.css";

const ChatContainer = () => (
  <main className={classes.chatContainer}>
    <div className={classes.content}>
      <div className={classes.chatList}>
        <div className={classes.chatsListHeader}>
          <div>
            <p className={classes.title}>Chats</p>
            <p className={classes.recentChats}>
              Recent Chats
              <ChevronDown color="#707C97" />
            </p>
          </div>
          <div>
            <Button
              icon={<PlusIcon size="24" />}
              className={classes.createChatButton}
            >
              Create new Chat
            </Button>
          </div>
        </div>
        <SearchBlock />
      </div>
      <div className={classes.chat}>ChatsList</div>
    </div>
  </main>
);

export default ChatContainer;
