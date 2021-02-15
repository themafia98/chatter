import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { AppStore } from '../../Interfaces';

type PrivateRouteProps = {
  children: ReactElement;
  path: string;
};

const PrivateRoute = ({ children, path }: PrivateRouteProps): ReactElement => {
  const user = useSelector(state => {
    const { appReducer } = state as Record<string, AppStore>;
    return appReducer.system.user;
  });

  return (
    <Route path={path} render={() => (user ? children : <Redirect to="/" />)} />
  );
};

export default PrivateRoute;