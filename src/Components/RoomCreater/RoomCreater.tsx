import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import Select from '../../common/Select/Select';
import TextInput from '../../common/TextInput/TextInput';
import { AppStore, ChatForm, ChatStore } from '../../Interfaces';
import { loadChats } from '../../redux/chatReducer/chatReducer.slice';
import { Chat } from '../../Types';
import { createRoom } from '../../utils';
import classes from './RoomCreater.module.css';

type RoomCreaterProps = {
  afterSubmitCallback?: MouseEventHandler;
};

const fakeUsers = [
  { id_user: '1', name: 'asdd', id: 1 },
  { id_user: '2', name: 'aasdasdsdd', id: 2 },
];

const defaultFormData: ChatForm = {
  roomName: '',
  chatType: 'common',
  usersIds: [],
};

const RoomCreater = ({
  afterSubmitCallback,
}: RoomCreaterProps): ReactElement => {
  const dispatch = useDispatch();

  const { createrId, users, chats } = useSelector(state => {
    const { appReducer } = state as Record<string, AppStore>;
    const { chatReducer } = state as Record<string, ChatStore>;

    return {
      createrId: appReducer.system.user?.id_user,
      users: appReducer.users,
      chats: chatReducer.chats,
    };
  });

  const [formData, setFormData] = useState<ChatForm>(
    (): ChatForm => defaultFormData
  );

  useEffect(() => {
    if (
      !createrId ||
      formData.usersIds.some(userId => userId === createrId)
    ) {
      return;
    }

    setFormData({
      ...formData,
      usersIds: [...formData.usersIds, createrId as string],
    });
  }, [createrId]);

  const options = useMemo(
    () =>
      fakeUsers.map(currentUser => 
        <option
          selected={formData.usersIds.some(
            userId => userId === currentUser.id_user
          )}
          key={currentUser.id}
          value={currentUser.id_user}>
          {currentUser.name}
        </option>
      ) || null,
    [users]
  );

  const handleChangeName: ChangeEventHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      roomName: target.value,
    });
  };

  const handleChangeUser: ChangeEventHandler = ({
    target,
  }: ChangeEvent<HTMLSelectElement>) => {
    const usersIds = formData.usersIds as string[];
    const selectedOptions: string[] = [];

    if (!target?.options) return;

    Array.from(target.options).forEach((option: HTMLOptionElement) => {
      if (option.selected) {
        selectedOptions.push(option.value);
      }
    });

    setFormData({
      ...formData,
      usersIds: [
        ...Array.from(
          new Set<string>([...usersIds, ...selectedOptions])
        ),
      ],
    });
  };

  const handleSubmitForm = (event: MouseEvent) => {
    const newChat: Chat = createRoom(formData);

    const newChats = chats ? [...chats, newChat] : [newChat];

    dispatch(loadChats(newChats));
    setFormData(defaultFormData);

    if (afterSubmitCallback) {
      afterSubmitCallback(event);
    }
  };

  return (
    <form className={classes.roomForm}>
      <TextInput
        wrapperClassName={classes.roomNameInput}
        onChange={handleChangeName}
        placeholder="Room name"
        value={formData.roomName}
        />
      <Select
        className={classes.select}
        options={options}
        value={formData.usersIds as string[]}
        onChange={handleChangeUser}
        name="users"
        multiple
        />
      <Button onClick={handleSubmitForm} className={classes.submitButton}>
        Submit
      </Button>
    </form>
  );
};

export default RoomCreater;