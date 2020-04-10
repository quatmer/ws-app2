import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { Route, Redirect, Switch } from 'react-router';
import HomePage from 'src/pages/HomePage';
import LoginPage from 'src/pages/LoginPage';
import SignupPage from 'src/pages/SignupPage';
import ErrorPage from 'src/pages/ErrorPage';
import AuthRoute from './AuthRoute';
import SideMenu from 'src/router/SideMenu';
import ProductCategoryPage from 'src/pages/ProductCategoryPage';
import BrandPage from 'src/pages/BrandPage';

const Routing = () => {
  return (
    <IonReactRouter>
      <Switch>
        <Route path="/login" exact={true} component={LoginPage} />
        <Route path="/signup" exact={true} component={SignupPage} />
        <IonSplitPane contentId="main">
          <SideMenu selectedPage="" />
          <IonRouterOutlet id="main">
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <AuthRoute path="/home" exact={true} component={HomePage} />
            <AuthRoute path="/product-category" exact={true} component={ProductCategoryPage} />
            <AuthRoute path="/brand" exact={true} component={BrandPage} />
            <Route path="/error" component={ErrorPage} />
            <Redirect to="/error" />
          </IonRouterOutlet>
        </IonSplitPane>
      </Switch>
    </IonReactRouter>
  );
};

export default Routing;
