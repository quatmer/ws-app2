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

const LoginForm = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle class="ion-padding">
          <IonText color="tertiary">Login</IonText>
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
        </IonList>
        <div id="auth-button-container" className="full-size content-center">
          <IonButton color="tertiary">Login</IonButton>
        </div>

        <IonButton id="other-auth-button" fill="clear" color="medium" size="small" routerLink="/signup">
          signup
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default LoginForm;
