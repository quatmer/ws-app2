import React from 'react';
import { IonPage, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonMenuButton } from '@ionic/react';
import { logOutSharp } from 'ionicons/icons';
import { useServices } from '../api/context/ServiceContext';

const HomePage = () => {
  const { Auth } = useServices();

  const logout = () => {
    Auth.logout();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home Page</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon slot="icon-only" icon={logOutSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default HomePage;
