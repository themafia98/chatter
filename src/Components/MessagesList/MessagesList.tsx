import { MouseEventHandler, ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatStore } from '../../Interfaces';
import { loadChats } from '../../redux/chatReducer/chatReducer.slice';
import { Chat } from '../../Types';
import Message from '../Message/Message';
import classes from './MessagesList.module.css';

type MessagesListProps = {
  onSelectChat: (id: string) => void;
};

const MessagesList = ({
  onSelectChat,
}: MessagesListProps): ReactElement | null => {
  const dispatch = useDispatch();

  const chats: Array<Chat> | null = useSelector(state => {
    const { chatReducer } = state as Record<string, ChatStore>;
    return chatReducer.chats;
  });

  const active_chat_id: string | null = useSelector(state => {
    const { chatReducer } = state as Record<string, ChatStore>;
    return chatReducer.active_chat_id;
  });

  const createHandleSelectChat = useCallback(
    (id: string): MouseEventHandler => () => onSelectChat(id),
    [onSelectChat]
  );

  const fetchFakeChats = useCallback(async () => {
    const { chats } = await import('./fakeApi.json');

    dispatch(loadChats(chats));
  }, []);

  useEffect(() => {
    fetchFakeChats();
  }, []);

  if (!chats) {
    return null;
  }

  return (
    <div className={classes.messagesList}>
      {chats.map((chat: Chat) => 
        <Message
          isActive={active_chat_id === chat.chat_id}
          onClick={createHandleSelectChat(`${chat.chat_id}`)}
          key={chat.id}>
          {`recipient_id: ${chat.recipient_id}`}
        </Message>
      )}
    </div>
  );
};

export default MessagesList;