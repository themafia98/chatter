import { ChangeEvent, ReactElement, useMemo, useState } from 'react';
import clsx from 'clsx';
import TextInput from '../../common/TextInput/TextInput';
import classes from './SearchBlock.module.css';
import Select from '../../common/Select/Select';
import SearchIcon from '../SearchIcon/SearchIcon';
import config from '../../App.config.json';
import { batch, useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/appReducer/appReducer.slice';
import { AppStore, ChatStore } from '../../Interfaces';
import { ChatType } from '../../Types';
import { setChatType } from '../../redux/chatReducer/chatReducer.slice';

const SearchBlock = (): ReactElement => {
  const dispatch = useDispatch();

  const { searchValue, selectOption } = useSelector(state => {
    const { appReducer } = state as Record<string, AppStore>;
    const { chatReducer } = state as Record<string, ChatStore>;
    const { value: searchValue = '' } = appReducer.search;
    const { chatType: selectOption } = chatReducer;

    return {
      searchValue,
      selectOption,
    };
  });

  const handleSearchMessages = ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchValue(target.value));

  const handleSelectOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    if (typeof event === 'string') {
      searchValue && dispatch(setSearchValue(''));
      dispatch(setChatType(event));
      return;
    }

    if (event.target.value === selectOption) {
      return;
    }

    searchValue && dispatch(setSearchValue(''));
    dispatch(setChatType(event.target.value as ChatType));
  };

  const options = useMemo(
    () =>
      config.options.chatContainers.map(it => 
        <option key={it.value} value={it.value}>
          {it.name}
        </option>
      ),
    []
  );

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
        onChange={handleSelectOptions}
        value={selectOption}
        name="messages"
        options={options}
        />
    </div>
  );
};

export default SearchBlock;