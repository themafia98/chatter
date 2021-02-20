import { Method } from 'axios';
import { v4 as uuid } from 'uuid';
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import Button from '../../common/Button/Button';
import Modal from '../../common/Modal/Modal';
import TextInput from '../../common/TextInput/TextInput';
import Request from '../../models/Request.model';
import { LoginData, RegData } from '../../Types';
import classes from './Login.module.css';

const Login = (): ReactElement => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [message, setShowMessage] = useState<string>('');
  const [formData, setFormData] = useState<LoginData | RegData | null>(null);

  const regFormData: RegData | null = visibleModal
    ? formData as RegData
    : null;

  const sendFormData = async (): Promise<void | null> => {
    if (!formData) return;

    const validFormData = new FormData();

    Object.keys(formData).forEach((key: any) => {
      const { [key]: currentValue } = formData as Record<string, string>;

      validFormData.append(key, currentValue);
    });

    if (visibleModal) {
      validFormData.append('id_user', uuid());
    }

    const apiUrl: string = visibleModal ? '/registration' : '/login';
    const apiMethod: Method = visibleModal ? 'PUT' : 'POST';

    try {
      const request = new Request();

      const response = await request.send(
        apiUrl,
        apiMethod,
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

      const { redirect = '', message = '', token } = response.data as Record<
        string,
        string
      >;

      if (token) {
        localStorage.setItem('token', token);
      }

      const shouldUseRedirect =
        redirect && redirect !== window.location.pathname;

      if (!shouldUseRedirect && message) {
        setShowMessage(message);
        return;
      }

      if (visibleModal) {
        handleVisibilityModalChange();
      }

      if (shouldUseRedirect) {
        window.location.assign(redirect);
      }
    } catch (error) {
      const { data = '' } = error.response || {};

      if (data && data !== message) {
        setShowMessage(data);
      }
    }
  };

  const handleSubmitForm: FormEventHandler = async (
    e: MouseEvent
  ): Promise<void> => {
    sendFormData();
  };

  const handleChangeFormInputs: ChangeEventHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    const loginData: LoginData = {
      ...formData as LoginData,
      [target.type !== 'password' ? 'email' : 'password']: target.value,
    };

    setFormData(loginData);
  };

  const handleVisibilityModalChange = () => {
    if (message) {
      setShowMessage('');
    }

    setFormData(null);
    setVisibleModal(!visibleModal);
  };

  const handleChangeRegFormInputs: ChangeEventHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    const loginData: RegData = {
      ...formData as RegData,
      [target.name]: target.value,
    };

    setFormData(loginData);
  };

  return (
    <>
      <section className={classes.container}>
        <header className={classes.header}>Chatter</header>
        <main className={classes.main}>
          <form className={classes.form}>
            {message && !visibleModal && 
              <p className={classes.message}>{message}</p>
            }
            <label className={classes.formLabel}>Login</label>
            <TextInput
              placeholder="email"
              className={classes.formInput}
              wrapperClassName={classes.wrapperFormInput}
              value={formData?.email}
              onChange={handleChangeFormInputs}
              />
            <label className={classes.formLabel}>Password</label>
            <TextInput
              className={classes.formInput}
              wrapperClassName={classes.wrapperFormInput}
              value={formData?.password}
              onChange={handleChangeFormInputs}
              type="password"
              />
            <Button className={classes.enterButton} onClick={handleSubmitForm}>
              Enter
            </Button>
            <Button onClick={handleVisibilityModalChange}>Registration</Button>
          </form>
        </main>
      </section>
      <Modal
        visible={visibleModal}
        onVisibilityChange={handleVisibilityModalChange}
        contentClassName={classes.contentModal}
        width={800}
        height={70}
        title="Registration">
        <form className={classes.regForm}>
          {message && visibleModal && 
            <p className={classes.message}>{message}</p>
          }
          <TextInput
            className={classes.regFormTextInput}
            wrapperClassName={classes.regFormTextInputWrapper}
            onChange={handleChangeRegFormInputs}
            placeholder="email*"
            name="email"
            value={regFormData?.email}
            />
          <TextInput
            className={classes.regFormTextInput}
            wrapperClassName={classes.regFormTextInputWrapper}
            onChange={handleChangeRegFormInputs}
            placeholder="password*"
            name="password"
            type="password"
            value={regFormData?.password}
            />
          <TextInput
            className={classes.regFormTextInput}
            wrapperClassName={classes.regFormTextInputWrapper}
            onChange={handleChangeRegFormInputs}
            placeholder="name*"
            name="name"
            value={regFormData?.name}
            />
          <TextInput
            className={classes.regFormTextInput}
            wrapperClassName={classes.regFormTextInputWrapper}
            onChange={handleChangeRegFormInputs}
            placeholder="phone"
            name="phone"
            type="phone"
            value={regFormData?.phone}
            />
          <Button onClick={handleSubmitForm}>Submit</Button>
        </form>
      </Modal>
    </>
  );
};

export default Login;