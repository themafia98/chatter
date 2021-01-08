import clsx from "clsx";
import { ChangeEventHandler, useEffect, useRef } from "react";
import classes from "./Select.module.css";

type SelectType = {
  className?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler;
  value: string;
  options: JSX.Element[];
  defaultValue?: string;
};

const Select = ({ className, name, placeholder, disabled, value, onChange, options }: SelectType) => {

  const selectRef = useRef<null | HTMLSelectElement>(null);

  useEffect(() => {

    if (value || !onChange || !selectRef.current) {
      return;
    }
    
    const { current } = selectRef;

    onChange(current.value as any);

  }, [selectRef, onChange, value]);
  
  return (
    <select
      ref={selectRef}
      disabled={disabled || !options || !options?.length}
      className={clsx(classes.select, className)}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    >
      {options}
    </select>
  );
}

Select.defaultProps = {
  className: "",
  disabled: false,
};

export default Select;
