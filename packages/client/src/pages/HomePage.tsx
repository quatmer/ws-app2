import React, { useState } from 'react';
import {
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
import WideModal from 'src/components/WideModal';
import { useServices } from 'src/api/context/service.context';

const HomePage = () => {
  const { AuthService } = useServices();
  const [openModal, setOpenModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home Page</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                console.log(AuthService);
                AuthService.logout();
              }}>
              <IonIcon slot="icon-only" icon={logOutSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <WideModal title="test" isOpen={openModal} onDidDismiss={() => setOpenModal(false)}></WideModal>
        <IonButton class="ion-margin" onClick={() => setOpenModal(true)}>
          Show Modal
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
