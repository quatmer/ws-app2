import React, { useEffect } from 'react';
import Routing from './router/Routing';
import { IonApp } from '@ionic/react';
import { HttpService } from './api/services/http.service';

const AppInit = () => {
  useEffect(() => {
    HttpService.initializeAxios();
    HttpService.startLogging();
  }, []);

  return (
    <IonApp>
      <Routing />
    </IonApp>
  );
};

export default AppInit;
