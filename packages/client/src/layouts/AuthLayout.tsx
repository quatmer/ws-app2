import React, { FC } from 'react';
import GridLayout from './GridLayout';
import { IonCol } from '@ionic/react';

const AuthLayout: FC = props => {
  return (
    <div id="auth-layout-container">
      <GridLayout>
        <IonCol sizeXs="12" sizeSm="11" sizeMd="10" sizeLg="8" sizeXl="6">
          {props.children}
        </IonCol>
      </GridLayout>
    </div>
  );
};

export default AuthLayout;
