import clsx from 'clsx';
import { CSSProperties, MouseEventHandler, ReactElement } from 'react';
import classes from './Control.module.css';

type ControlProps = {
  onClick: MouseEventHandler;
  className?: string;
  children: ReactElement;
  style?: CSSProperties;
};

const Control = ({
  onClick,
  className,
  children,
  style,
}: ControlProps): ReactElement => 
  <div
    style={style}
    onClick={onClick}
    className={clsx(classes.control, className)}>
    {children}
  </div>
;
Control.defaultProps = {
  className: '',
  style: null,
};

export default Control;