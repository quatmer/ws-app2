import React, { useEffect } from 'react';
import Routing from './router/Routing';
import { IonApp } from '@ionic/react';
import { AppService } from './api/services/app.service';
import NotificationContainer from './container/Notification/NotificationContainer';
import { useServices } from './api/context/ServiceContext';

const AppInit = () => {
  const { Auth } = useServices();
  useEffect(() => {
    AppService.initApp(Auth);
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
