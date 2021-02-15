import axios from 'axios';
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import Button from '../../common/Button/Button';
import TextInput from '../../common/TextInput/TextInput';
import Request from '../../models/Request.model';
import { LoginData } from '../../Types';
import classes from './Login.module.css';

const Login = (): ReactElement => {
  const [message, setShowMessage] = useState<string>('');
  const [formData, setFormData] = useState<LoginData>(() => ({
    email: 'admin@admin.ru',
    password: '',
  }));

  const sendFormData = async (): Promise<void | null> => {
    const validFormData = new FormData();

    Object.keys(formData).forEach((key: any) => {
      const { [key]: currentValue } = formData as Record<string, string>;

      validFormData.append(key, currentValue);
    });
    try {
      const request = new Request();

      const response = await request.send(
        '/login',
        'POST',
        validFormData,
        true,
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          useCredentails: 'include',
        }
      );

      if (response.status !== 200 && response.status !== 204) {
        throw new Error('bad auth');
      }

      const { redirect = '', message = '' } = response.data as Record<
        string,
        string
      >;

      const shouldUseRedirect =
        redirect && redirect !== window.location.pathname;

      if (!shouldUseRedirect && message) {
        setShowMessage(message);
        return;
      }

      if (shouldUseRedirect) {
        window.location.assign(redirect);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };

  const handleSubmitForm: FormEventHandler = async (
    e: MouseEvent
  ): Promise<void> => {
    sendFormData();
  };

  const handleChangeFormInputs: ChangeEventHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void =>
    setFormData({
      ...formData,
      [target.type !== 'password' ? 'email' : 'password']: target.value,
    });

  return (
    <section className={classes.container}>
      <header className={classes.header}>Chatter</header>
      <main className={classes.main}>
        <form className={classes.form}>
          {message && <p className={classes.message}>{message}</p>}
          <label className={classes.formLabel}>Login</label>
          <TextInput
            placeholder="email"
            className={classes.formInput}
            wrapperClassName={classes.wrapperFormInput}
            value={formData.email}
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