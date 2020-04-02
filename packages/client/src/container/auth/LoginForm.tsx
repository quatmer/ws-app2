import React, { useState } from 'react';
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
  IonSpinner,
} from '@ionic/react';
import { useDispatch } from 'react-redux';
import { AuthActions } from 'src/redux/auth/action';
import { useTypeSelector } from 'src/redux/helper/selector.helper';
import { useLocation } from 'react-router';
import AuthLayout from 'src/layouts/AuthLayout';

type State = {
  username: string;
  password: string;
};
const LoginForm = () => {
  const [state, setState] = useState<State>({ username: 'quatmer', password: '4mer' });
  const { loading } = useTypeSelector(s => s.authState);
  const location = useLocation<{ from: Location }>();
  const dispatch = useDispatch();

  let redirectPath = '/';
  if (!!location.state && location.state.from) {
    redirectPath = location.state.from.pathname;
  }

  const login = () => {
    dispatch(AuthActions.login(state.username, state.password));
  };

  return (
    <AuthLayout redirectPath={redirectPath}>
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
                Username
                <IonText color="danger"> *</IonText>
              </IonLabel>
              <IonInput
                value={state.username}
                type="text"
                onIonChange={event => setState({ ...state, username: event.detail.value || '' })}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">
                Password
                <IonText color="danger"> *</IonText>
              </IonLabel>
              <IonInput
                value={state.password}
                type="password"
                onIonChange={event => setState({ ...state, password: event.detail.value || '' })}
              />
            </IonItem>
          </IonList>
          <div id="auth-button-container" className="full-size content-center">
            <IonButton color="tertiary" onClick={login} disabled={loading}>
              {loading ? <IonSpinner name="dots" /> : 'Login'}
            </IonButton>
          </div>

          <IonButton id="other-auth-button" fill="clear" color="medium" size="small" routerLink="/signup">
            Signup
          </IonButton>
        </IonCardContent>
      </IonCard>
    </AuthLayout>
  );
};

export default LoginForm;
