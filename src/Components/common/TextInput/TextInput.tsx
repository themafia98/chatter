import clsx from "clsx";
import { ChangeEventHandler } from "react";
import classes from './TextInput.module.css';

type TextInputType = {
    className?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: ChangeEventHandler;
    disabled?: boolean;
};

const TextInput = ({ className, value, onChange, placeholder, disabled }: TextInputType) => (
  <input 
    onChange={onChange} 
    className={clsx(classes.input, className)} 
    type="text"
    placeholder={placeholder}
    value={value}
    disabled={disabled}
  />
);

TextInput.defaultProps = {
  value: "",
  className: "",
  onChange: null,
  disabled: false
}

export default TextInput;