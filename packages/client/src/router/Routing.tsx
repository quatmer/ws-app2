import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import HomePage from 'src/pages/HomePage';
import LoginPage from 'src/pages/LoginPage';
import SignupPage from 'src/pages/SignupPage';
import ErrorPage from 'src/pages/ErrorPage';

const Routing = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={HomePage} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />

        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />

        <Route path="/error" component={ErrorPage} />
        <Redirect to="/error" />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routing;