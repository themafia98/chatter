import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../common/Button/Button';
import TextInput from '../../common/TextInput/TextInput';
import { User } from '../../Interfaces';
import { loadUser } from '../../redux/appReducer/appReducer.slice';
import { LoginData } from '../../Types';
import classes from './Login.module.css';

const Login = (): ReactElement => {
  const [message, setShowMessage] = useState<string>('');
  const [formData, setFormData] = useState<LoginData>(() => ({
    login: 'Pavel',
    password: '',
  }));

  const dispatch = useDispatch();

  const sendFormData = async (): Promise<User | null> => {
    try {
      const user = (await import('./fakeUserApi.json')).default;
      return user;
    } catch (error) {
      return null;
    }
  };

  const handleSubmitForm: FormEventHandler = async (
    e: MouseEvent
  ): Promise<void> => {
    if (message) setShowMessage('');

    const user: User | null = await sendFormData();

    if (!user) {
      setShowMessage('Invalid');
      return;
    }

    dispatch(loadUser(user));
  };

  const handleChangeFormInputs: ChangeEventHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void =>
    setFormData({
      ...formData,
      [target.type !== 'password' ? 'login' : 'password']: target.value,
    });

  return (
    <section className={classes.container}>
      <header className={classes.header}>Chatter</header>
      <main className={classes.main}>
        <form className={classes.form}>
          {message && <p className={classes.message}>{message}</p>}
          <label className={classes.formLabel}>Login</label>
          <TextInput
            className={classes.formInput}
            wrapperClassName={classes.wrapperFormInput}
            value={formData.login}
            onChange={handleChangeFormInputs}
            />
          <label className={classes.formLabel}>Password</label>
          <TextInput
            className={classes.formInput}
            wrapperClassName={classes.wrapperFormInput}
            value={formData.password}
            onChange={handleChangeFormInputs}
            type="password"
            />
          <Button onClick={handleSubmitForm}>Войти</Button>
        </form>
      </main>
    </section>
  );
};

export default Login;