import { ReactElement } from 'react';
import Menu from '../Menu/Menu';
import UserBlock from '../UserBlock/UserBlock';
import classes from './Aside.module.css';

const Aside = (): ReactElement => 
  <aside className={classes.aside}>
    <div className={classes.informSection}>
      <UserBlock />
    </div>
    <Menu />
  </aside>
;
export default Aside;