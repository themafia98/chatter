import clsx from "clsx";
import TextInput from "../common/TextInput/TextInput";
import classes from "./SearchBlock.module.css";

const SearchBlock = () => {
  const handleSearchMessages = () => {};

  return (
    <div className={classes.searchBlock}>
      <TextInput placeholder="Search" className={classes.searchController} />
      <TextInput
        onChange={handleSearchMessages}
        placeholder="Messages"
        className={clsx(classes.searchController, classes.searchDropdown)}
        disabled
      />
    </div>
  );
};

export default SearchBlock;
