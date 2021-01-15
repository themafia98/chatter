import { ChangeEvent, ReactElement, useMemo, useState } from 'react';
import clsx from 'clsx';
import TextInput from '../../common/TextInput/TextInput';
import classes from './SearchBlock.module.css';
import Select from '../../common/Select/Select';
import SearchIcon from '../SearchIcon/SearchIcon';
import config from '../../App.config.json';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/appReducer/appReducer.slice';
import { AppStore } from '../../Interfaces';

const SearchBlock = (): ReactElement => {
  const [selectOption, setSelectOption] = useState<string>('');
  const dispatch = useDispatch();

  const searchValue = useSelector(state => {
    const { appReducer } = state as Record<string, AppStore>;
    return appReducer.search.value || '';
  });

  const handleSearchMessages = ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchValue(target.value));

  const handleSelectOptions = (event: ChangeEvent<HTMLInputElement>) => {
    if (typeof event === 'string') {
      setSelectOption(event);
      return;
    }

    if (event.target.value === selectOption) {
      return;
    }

    setSelectOption(event.target.value);
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