import React, { useEffect } from 'react';
import Routing from './router/Routing';
import { IonApp } from '@ionic/react';
import { AppService } from './api/services/app.service';
import NotificationContainer from './container/Notification/NotificationContainer';

const AppInit = () => {
  useEffect(() => {
    AppService.initApp();
  }, []);

  return (
    <IonApp>
      <NotificationContainer />
      <Routing />
    </IonApp>
  );
};

export default AppInit;
