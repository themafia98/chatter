import React, { ReactElement } from 'react';
import Aside from './Components/Aside/Aside';
import Container from './Components/Container/Container';
import classes from './App.module.css';

const App = (): ReactElement => 
  <div className={classes.container}>
    <Aside />
    <Container />
  </div>
;
export default App;
