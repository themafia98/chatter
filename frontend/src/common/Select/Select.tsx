import clsx from 'clsx';
import { ChangeEventHandler, ReactElement, useEffect, useRef } from 'react';
import classes from './Select.module.css';

type SelectType = {
  className?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler;
  value: string | string[];
  options: JSX.Element[] | null;
  multiple?: boolean;
};

const Select = ({
  className,
  name,
  placeholder,
  disabled,
  value,
  onChange,
  options,
  multiple,
}: SelectType): ReactElement => {
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
      multiple={multiple}
      value={value}>
      {options}
    </select>
  );
};

Select.defaultProps = {
  className: '',
  disabled: false,
  multiple: false,
};

export default Select;