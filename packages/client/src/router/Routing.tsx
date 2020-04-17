import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { Route, Redirect, Switch } from 'react-router';
import AuthRoute from './AuthRoute';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import SideMenu from './SideMenu';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import ProductCategoryPage from '../pages/ProductCategoryPage';
import ProductBrandPage from '../pages/ProductBrandPage';
import ErrorPage from '../pages/ErrorPage';

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
            <AuthRoute path="/product" exact={true} component={ProductPage} />
            <AuthRoute path="/product-category" exact={true} component={ProductCategoryPage} />
            <AuthRoute path="/product-brand" exact={true} component={ProductBrandPage} />
            <Route path="/error" component={ErrorPage} />
            <Redirect to="/error" />
          </IonRouterOutlet>
        </IonSplitPane>
      </Switch>
    </IonReactRouter>
  );
};

export default Routing;
