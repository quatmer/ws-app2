import React, { useEffect } from 'react';
import Routing from './router/Routing';
import { IonApp } from '@ionic/react';
import { AppService } from './api/services/app.service';
import NotificationContainer from './container/Notification/NotificationContainer';
import { useServices } from './api/context/ServiceContext';
import { useDispatch } from 'react-redux';
import { ProductCategoryActions } from './redux/product-category/action';

const AppInit = () => {
  const { Auth, BrandService } = useServices();
  const dispatch = useDispatch();

  useEffect(() => {
    AppService.initApp(Auth);
    BrandService.getList();
    dispatch(ProductCategoryActions.getList());
    // eslint-disable-next-line
  }, []);

  return (
    <IonApp>
      <NotificationContainer />
      <Routing />
    </IonApp>
  );
};

export default AppInit;
