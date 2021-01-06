import { ChangeEvent, useState } from "react";
import clsx from "clsx";
import TextInput from "../common/TextInput/TextInput";
import classes from "./SearchBlock.module.css";
import Select from "../common/Select/Select";
import SearchIcon from "../SearchIcon/SearchIcon";

const SearchBlock = () => {
  const [searchValue, setSearchValue] = useState<string | number>("");

  const handleSearchMessages = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(target.value);

  return (
    <div className={classes.searchBlock}>
      <TextInput
        onChange={handleSearchMessages}
        value={searchValue}
        placeholder="Search"
        className={clsx(classes.searchController, classes.searchInput)}
        icon={<SearchIcon color=" #707C97" className={classes.searchIcon} />}
      />
      <Select
        placeholder="Messages"
        className={clsx(classes.searchController, classes.searchDropdown)}
        name="messages"
      />
    </div>
  );
};

export default SearchBlock;
