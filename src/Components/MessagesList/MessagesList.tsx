import {
  MouseEventHandler,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '../../hooks/usePrevious';
import { AppStore, ChatStore } from '../../Interfaces';
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
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { chatsList, active_chat_id, chatType, searchValue } = useSelector(
    state => {
      const { appReducer } = state as Record<string, AppStore>;
      const { chatReducer } = state as Record<string, ChatStore>;

      const { value: searchValue } = appReducer.search;
      const { chats: chatsList, active_chat_id, chatType } = chatReducer;

      return {
        chatsList,
        active_chat_id,
        chatType,
        searchValue,
      };
    }
  );

  const prevChatType = usePrevious(chatType);

  const createHandleSelectChat = useCallback(
    (id: string): MouseEventHandler => () => onSelectChat(id),
    [onSelectChat]
  );

  const fetchFakeChats = useCallback(async () => {
    try {
      if (isLoading || (chatsList && prevChatType === chatType)) {
        return;
      }

      setLoading(true);

      const { chats } = await import('./fakeApi.json');

      if (chats) {
        setLoading(false);
        dispatch(loadChats(chats));
      }
    } catch {
      setLoading(false);
    }
  }, [chatType]);

  useEffect(() => {
    fetchFakeChats();
  }, [fetchFakeChats]);

  const filteredChats = useMemo(
    () =>
      chatsList?.length
        ? chatsList.filter((message: Chat) => {
            if (!searchValue) return true;

            const messageKeys: string[] = Object.keys(message);

            for (const key of messageKeys) {
              const { [key]: value = '' } = message as Record<string, any>;

              if (['id', 'chat_id'].some(it => it === key)) {
                continue;
              }

              if (
                value === searchValue ||
                (typeof value === 'string' &&
                  value.toLowerCase().includes(searchValue.toLowerCase()))
              ) {
                return true;
              }
            }

            return false;
          })
        : null,
    [searchValue, chatsList]
  );

  if (filteredChats === null) return null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.messagesList}>
      {filteredChats.map((chat: Chat) => 
        <Message
          shouldHighlight={!!searchValue}
          isActive={active_chat_id === chat.chat_id}
          onClick={createHandleSelectChat(`${chat.chat_id}`)}
          key={chat.id}>
          {`${chat.recipient_id}`}
        </Message>
      )}
    </div>
  );
};

export default MessagesList;