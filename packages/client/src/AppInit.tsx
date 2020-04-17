import React, { useEffect } from 'react';
import Routing from './router/Routing';
import { IonApp } from '@ionic/react';
import { useServices } from './api/context/ServiceContext';
import { useDispatch } from 'react-redux';
import { ProductCategoryActions } from './redux/product-category/action';
import { useTypeSelector } from './redux/helper/selector.helper';
import { AppUtil } from './api/utils/app.util';
import * as firebase from "firebase/app";
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig);

const AppInit = () => {
  const { user } = useTypeSelector(x => x.authState);
  const { Auth, BrandService } = useServices();
  const dispatch = useDispatch();

  useEffect(() => {
    AppUtil.initApp(Auth);
    if (!!user) {
      BrandService.getList();
      dispatch(ProductCategoryActions.getList());
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <IonApp>
      <Routing />
    </IonApp>
  );
};

export default AppInit;
