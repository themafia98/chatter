import { CSSProperties, MouseEventHandler, ReactElement } from 'react';
import clsx from 'clsx';
import classes from './Button.module.css';

type ButtonProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
  type: 'submit' | 'reset' | 'button';
  children: string;
  icon?: ReactElement;
};

const Button = ({
  className,
  style,
  onClick,
  type,
  children,
  icon,
}: ButtonProps): ReactElement => 
  <button
    onClick={onClick}
    style={style}
    className={clsx(classes.button, className)}
    type={type}>
    {icon}
    {children}
  </button>
;
Button.defaultProps = {
  type: 'button',
  className: '',
  style: null,
  onClick: null,
};

export default Button;