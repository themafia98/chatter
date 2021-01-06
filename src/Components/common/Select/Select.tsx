import clsx from "clsx";
import classes from "./Select.module.css";

type SelectType = {
  className?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
};

const Select = ({ className, name, placeholder, disabled }: SelectType) => (
  <select
    className={clsx(classes.select, className)}
    name={name}
    placeholder={placeholder}
    disabled={disabled}
  >
    <option value="messages">Messages</option>
  </select>
);

Select.defaultProps = {
  className: "",
  disabled: false,
};

export default Select;
