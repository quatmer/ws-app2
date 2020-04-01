import React, { useState, useEffect } from 'react';
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
import { useLocation, useHistory } from 'react-router';

type State = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const { loading, user } = useTypeSelector(s => s.authState);
  const history = useHistory();
  const location = useLocation<{ from: Location }>();

  const dispatch = useDispatch();
  const [state, setState] = useState<State>({ username: 'quatmer', password: '4mer' });

  const login = () => {
    dispatch(AuthActions.login(state.username, state.password));
  };

  useEffect(() => {
    console.log('[LoginForm] useEffect init');
    if (!!user) {
      if (!!location.state && !!location.state.from) {
        history.replace(location.state.from.pathname);
      } else {
        history.replace('/');
      }
    }
    return () => console.log('[LoginForm] useEffect destroy');
    //eslint-disable-next-line
  }, [!!user]);

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
            <IonInput
              value={state.username}
              type="text"
              onIonChange={event => setState({ ...state, username: event.detail.value || '' })}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">
              password
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
          signup
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default LoginForm;
