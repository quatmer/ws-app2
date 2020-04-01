import React from 'react';
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonButton, IonButtons, IonIcon } from '@ionic/react';
import { logOutSharp } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { AuthActions } from 'src/redux/auth/action';

const HomePage = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Home Page</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon slot="icon-only" icon={logOutSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default HomePage;
