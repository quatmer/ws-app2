import React, { useState } from 'react';
import
{
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
} from '@ionic/react';
import { logOutSharp } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { AuthActions } from 'src/redux/auth/action';
import WideModal from 'src/components/WideModal';

const HomePage = () =>
{
  const [ openModal, setOpenModal ] = useState( false );
  const dispatch = useDispatch();

  const logout = () =>
  {
    dispatch( AuthActions.logout() );
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
              Logout
              <IonIcon slot="end" icon={logOutSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <WideModal title="test" isOpen={openModal} onDidDismiss={() => setOpenModal( false )}></WideModal>
        <IonButton class="ion-margin" onClick={() => setOpenModal( true )}>
          Show Modal
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
