import React from 'react';
import Routing from './router/Routing';
import { IonApp } from '@ionic/react';

const AppInit = () => {
  return (
    <IonApp>
      <Routing />
    </IonApp>
  );
};

export default AppInit;
