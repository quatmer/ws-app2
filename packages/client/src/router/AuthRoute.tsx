import React, { FC } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useTypeSelector } from 'src/redux/helper/selector.helper';

type Props = { path: string; component: FC; exact: boolean };
const AuthRoute = (props: Props) => {
  const { user } = useTypeSelector(s => s.authState);

  const isAuth = !!user;

  const { component: Component } = props;
  const location = useLocation();
  return (
    <Route
      exact={props.exact}
      path={props.path}
      render={() => (isAuth ? <Component /> : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

export default AuthRoute;
