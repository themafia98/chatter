import { ReactElement } from 'react';
import Aside from '../../Components/Aside/Aside';
import Container from '../../Components/Container/Container';
import classes from './ChatDashboard.module.css';

const ChatDashboard = (): ReactElement => 
  <div className={classes.container}>
    <Aside />
    <Container />
  </div>
;
export default ChatDashboard;