import React, { ReactElement } from 'react';
import Aside from './Components/Aside/Aside';
import Container from './Components/Container/Container';
import classes from './App.module.css';
import { useSelector } from 'react-redux';
import { AppStore } from './Interfaces';
import Login from './pages/Login/Login';

const App = (): ReactElement => {
  const user = useSelector(state => {
    const { appReducer } = state as Record<string, AppStore>;
    return appReducer.system.user;
  });

  if (!user) return <Login />;

  return (
    <div className={classes.container}>
      <Aside />
      <Container />
    </div>
  );
};
export default App;