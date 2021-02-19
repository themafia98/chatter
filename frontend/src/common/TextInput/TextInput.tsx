import clsx from 'clsx';
import { ChangeEventHandler, ReactElement, useState } from 'react';
import classes from './TextInput.module.css';

type TextInputType = {
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: ChangeEventHandler;
  disabled?: boolean;
  icon?: ReactElement;
  type?: string;
  name?: string;
};

const TextInput = ({
  className,
  wrapperClassName,
  value,
  onChange,
  placeholder,
  disabled,
  icon,
  type,
  name,
}: TextInputType): ReactElement => {
  const [isFocus, setFocus] = useState<boolean>(false);

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  const shouldShowIcon = !value && !isFocus;

  return (
    <div className={clsx(classes.inputWrapper, wrapperClassName)}>
      {shouldShowIcon && icon}
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        className={clsx(classes.input, className)}
        type={type}
        placeholder={!isFocus ? placeholder : ''}
        value={value}
        name={name}
        disabled={disabled}
        />
    </div>
  );
};

TextInput.defaultProps = {
  value: '',
  className: '',
  wrapperClassName: '',
  name: '',
  onChange: null,
  disabled: false,
  icon: null,
  type: 'text',
};

export default TextInput;