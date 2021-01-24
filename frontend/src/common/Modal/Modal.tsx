import clsx from 'clsx';
import { MouseEvent, MouseEventHandler, ReactElement } from 'react';
import classes from './Modal.module.css';

type ModalProps = {
  visible: boolean;
  children: ReactElement;
  onVisibilityChange: MouseEventHandler;
  title: string;
};

const Modal = ({
  visible,
  children,
  onVisibilityChange,
  title,
}: ModalProps): ReactElement | null => {
  if (!visible) return null;

  const handleChangeVisibility = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    if (!target.className.includes('modal-close-target')) {
      return;
    }

    onVisibilityChange(event);
  };

  return (
    <div
      onClick={handleChangeVisibility}
      className={clsx(classes.modalWrapper, 'modal-close-target')}>
      <div className={classes.modal}>
        <div className={classes.modalContainer}>
          <div
            onClick={handleChangeVisibility}
            role="button"
            aria-hidden={true}
            className={clsx(classes.modalButton, 'modal-close-target')}>
            X
          </div>
          <header className={classes.header}>
            <p className={classes.title}>{title}</p>
          </header>
          <section className={classes.content}>{children}</section>
        </div>
      </div>
    </div>
  );
};

export default Modal;