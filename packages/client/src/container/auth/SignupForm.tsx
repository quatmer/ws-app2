import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/react';

const SignupForm = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle class="ion-padding">
          <IonText color="tertiary">Signup</IonText>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">
              username
              <IonText color="danger"> *</IonText>
            </IonLabel>
            <IonInput type="text" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">
              password
              <IonText color="danger"> *</IonText>
            </IonLabel>
            <IonInput type="password" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">
              re-password
              <IonText color="danger"> *</IonText>
            </IonLabel>
            <IonInput type="password" />
          </IonItem>
        </IonList>
        <div id="auth-button-container" className="full-size content-center">
          <IonButton color="tertiary">Signup</IonButton>
        </div>

        <IonButton id="other-auth-button" fill="clear" color="medium" size="small" routerLink="/login">
          login
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default SignupForm;
