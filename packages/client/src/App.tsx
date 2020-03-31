import './App.scss';
import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet></IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
