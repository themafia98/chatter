import { MouseEventHandler, ReactElement, useState } from 'react';
import ChatContainer from '../ChatContainer/ChatContainer';
import ChevronDown from '../ChevronDown/ChevronDown';
import Button from '../../common/Button/Button';
import MessagesList from '../MessagesList/MessagesList';
import PlusIcon from '../PlusIcon/PlusIcon';
import SearchBlock from '../SearchBlock/SearchBlock';
import classes from './Container.module.css';
import { batch, useDispatch, useSelector } from 'react-redux';
import { ChatStore } from '../../Interfaces';
import {
  clearMessages,
  setChatId,
} from '../../redux/chatReducer/chatReducer.slice';
import Modal from '../../common/Modal/Modal';
import RoomCreater from '../RoomCreater/RoomCreater';

const Container = (): ReactElement => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const active_chat_id: string | null = useSelector(state => {
    const { chatReducer } = state as Record<string, ChatStore>;
    return chatReducer.active_chat_id;
  });

  const handleSelectChat = (id: string): void => {
    if (id === active_chat_id) {
      return;
    }

    batch(() => {
      dispatch(setChatId(id));
      dispatch(clearMessages());
    });
  };

  const handleModalVisibility: MouseEventHandler = () =>
    setVisibleModal(!visibleModal);

  return (
    <>
      <Modal
        title="Создание чата"
        onVisibilityChange={handleModalVisibility}
        visible={visibleModal}>
        <RoomCreater afterSubmitCallback={handleModalVisibility} />
      </Modal>
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
                  onClick={handleModalVisibility}
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
            <ChatContainer activeChatId={active_chat_id} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Container;