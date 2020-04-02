import './Component.scss';
import React, { FC, useRef } from 'react';
import {
  IonModal,
  IonButton,
  IonIcon,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
} from '@ionic/react';
import { close } from 'ionicons/icons';

type Props = { isOpen: boolean; onDidDismiss: () => void; title: string };
const WideModal: FC<Props> = props => {
  const ref = useRef<HTMLIonModalElement | null>(null);

  return (
    <IonModal ref={ref} id="wide-modal" isOpen={props.isOpen} onDidDismiss={props.onDidDismiss}>
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

export default WideModal;
