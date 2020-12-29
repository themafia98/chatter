import classes from "./ChatContainer.module.css";

const ChatContainer = () => (
  <main className={classes.content}>
    <div className={classes.chatList}>
      <div className={classes.chatsListHeader}>
        <div>
          <p className={classes.title}>Chats</p>
          <p className={classes.recentChats}>Recent Chats</p>
        </div>
        <div>
          <button type="button">Create new Chat</button>
        </div>
      </div>
    </div>
    <div className={classes.chat}>123</div>
  </main>
);

export default ChatContainer;
