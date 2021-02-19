import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './pages/Login/Login';
import ChatDashboard from './pages/ChatDashboard/ChatDashboard';
import PrivateRoute from './Components/helpers/PrivateRoute';
import Request from './models/Request.model';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/appReducer/appReducer.slice';
import Loader from './Components/Loader/Loader';
import classes from './App.module.css';

const App = (): ReactElement => {
  const [isAppStart, setAppStart] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const checkAuthenticate = useCallback(async () => {
    try {
      const request = new Request();

      const response = await request.send('/jwt/auth', 'POST', null, true);
      setAppStart(true);

      if (
        response.status === 200 &&
        history.location.pathname !== '/chatDashboard'
      ) {
        dispatch(loadUser(response.data));
        history.push('/chatDashboard');
      }
    } catch {
      setAppStart(true);
      if (history.location.pathname !== '/') {
        history.push('/');
      }
    }
  }, []);

  useEffect(() => {
    checkAuthenticate();
  }, []);

  if (!isAppStart) {
    return <Loader className={classes.loader} />;
  }

  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <PrivateRoute path="/chatDashboard">
        <ChatDashboard />
      </PrivateRoute>
    </Switch>
  );
};

export default App;