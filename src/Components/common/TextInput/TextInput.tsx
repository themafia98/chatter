import clsx from "clsx";
import { ChangeEventHandler, ReactElement, useState } from "react";
import classes from "./TextInput.module.css";

type TextInputType = {
  className?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: ChangeEventHandler;
  disabled?: boolean;
  icon?: ReactElement;
};

const TextInput = ({
  className,
  value,
  onChange,
  placeholder,
  disabled,
  icon,
}: TextInputType) => {

  const [isFocus, setFocus] = useState<boolean>(false);

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  const shouldShowIcon = !value && !isFocus;
  
  return (
    <div className={classes.inputWrapper}>
      {shouldShowIcon && icon}
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        className={clsx(classes.input, className)}
        type="text"
        placeholder={!isFocus ? placeholder : ""}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

TextInput.defaultProps = {
  value: "",
  className: "",
  onChange: null,
  disabled: false,
  icon: null,
};

export default TextInput;
