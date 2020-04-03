import './Component.scss';
import React, { FC, useRef } from 'react';
import {
  IonModal,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
} from '@ionic/react';
import { close } from 'ionicons/icons';

type Props = { isOpen: boolean; onDidDismiss: () => void; title: string };
const TightModal: FC<Props> = props => {
  const ref = useRef<HTMLIonModalElement | null>();

  return (
    <IonModal id="tight-modal" isOpen={props.isOpen} onDidDismiss={props.onDidDismiss}>
      <IonPage>
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonTitle>{props.title}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => ref.current?.dismiss()}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>{props.children}</IonContent>
      </IonPage>
    </IonModal>
  );
};

export default TightModal;
