import clsx from 'clsx';
import TextInput from '../common/TextInput/TextInput';
import classes from './SearchBlock.module.css';

const SearchBlock = () => (
    <div className={classes.searchBlock}>
        <TextInput placeholder="Search" className={classes.searchController} />
        <TextInput disabled placeholder="Messages" className={clsx(classes.searchController, classes.searchDropdown)} />
    </div>
);

export default SearchBlock;