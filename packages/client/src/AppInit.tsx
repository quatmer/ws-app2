import React, { useEffect } from 'react';
import Routing from './router/Routing';
import { IonApp } from '@ionic/react';
import { AppService } from './api/services/app.service';

const AppInit = () => {
  useEffect(() => {
    AppService.initApp();
  }, []);

  return (
    <IonApp>
      <Routing />
    </IonApp>
  );
};

export default AppInit;
