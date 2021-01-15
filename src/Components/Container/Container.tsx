import { ReactElement, useState } from 'react';
import ChatContainer from '../ChatContainer/ChatContainer';
import ChevronDown from '../ChevronDown/ChevronDown';
import Button from '../common/Button/Button';
import MessagesList from '../MessagesList/MessagesList';
import PlusIcon from '../PlusIcon/PlusIcon';
import SearchBlock from '../SearchBlock/SearchBlock';
import classes from './Container.module.css';

const Container = (): ReactElement => {
  const [chatId, setChatId] = useState<string | null>(null);

  const handleSelectChat = (id: string): void => {
    if (id === chatId) {
      return;
    }

    setChatId(id);
  };

  return (
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
                className={classes.createChatButton}>
                Create new Chat
              </Button>
            </div>
          </div>
          <SearchBlock />
          <MessagesList onSelectChat={handleSelectChat} />
        </div>
        <div className={classes.chat}>
          <ChatContainer key={chatId} chatId={chatId} />
        </div>
      </div>
    </main>
  );
};

export default Container;