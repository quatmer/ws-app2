import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect, Switch } from 'react-router';
import HomePage from 'src/pages/HomePage';
import LoginPage from 'src/pages/LoginPage';
import SignupPage from 'src/pages/SignupPage';
import ErrorPage from 'src/pages/ErrorPage';
import AuthRoute from './AuthRoute';

const Routing = () => {
  return (
    <IonReactRouter>
      <Switch>
        <Route path="/login" exact={true} component={LoginPage} />
        <Route path="/signup" exact={true} component={SignupPage} />
        <IonRouterOutlet>
          <AuthRoute path="/home" exact={true} component={HomePage} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/error" component={ErrorPage} />
          <Redirect to="/error" />
        </IonRouterOutlet>
      </Switch>
    </IonReactRouter>
  );
};

export default Routing;
