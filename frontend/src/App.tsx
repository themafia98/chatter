import React, { ReactElement, useCallback, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Login from './pages/Login/Login';
import ChatDashboard from './pages/ChatDashboard/ChatDashboard';
import PrivateRoute from './Components/helpers/PrivateRoute';
import Request from './models/Request.model';

const App = (): ReactElement => {
  const history = useHistory();

  const checkAuthenticate = useCallback(async () => {
    try {
      const request = new Request();
      const response = await request.send('/authenticate', 'GET', null, true);

      if (
        response.status === 200 &&
        history.location.pathname !== '/chatDashboard'
      ) {
        history.push('/chatDashboard');
      }
    } catch {
      if (history.location.pathname !== '/') {
        history.push('/');
      }
    }
  }, []);

  useEffect(() => {
    checkAuthenticate();
  }, []);

  return (
    <>
      <Route path="/">
        <Login />
      </Route>
      <PrivateRoute path="/chatDashboard">
        <ChatDashboard />
      </PrivateRoute>
    </>
  );
};

export default App;