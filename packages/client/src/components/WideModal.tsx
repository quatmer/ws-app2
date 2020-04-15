import './Component.scss';
import React, { FC, useRef } from 'react';
import { IonModal, IonButton, IonIcon, IonNote, IonContent } from '@ionic/react';
import { close } from 'ionicons/icons';

type Props = { isOpen: boolean; onDidDismiss: () => void; title: string; description?: string };
const WideModal: FC<Props> = props => {
  const ref = useRef<HTMLIonModalElement | null>(null);

  return (
    <IonModal id="ion-wide-modal" keyboardClose isOpen={props.isOpen} onDidDismiss={props.onDidDismiss} ref={ref}>
      <div id="wide-modal">
        <div id="toolbar">
          <div id="title">
            <h3>{props.title}</h3>
          </div>
          <div id="close-button">
            <IonButton color="light" fill="clear" shape="round" onClick={() => ref.current?.dismiss()}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </div>
        </div>
        <div id="content">
          {props.description && <IonNote id="description">{props.description}</IonNote>}
          {props.children}
        </div>
      </div>
    </IonModal>
  );
};

export default WideModal;
