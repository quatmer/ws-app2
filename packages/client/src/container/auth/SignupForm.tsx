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
  IonNote,
  IonSpinner,
} from '@ionic/react';
import { useTypeSelector } from 'src/redux/helper/selector.helper';
import { useDispatch } from 'react-redux';
import { AuthActions } from 'src/redux/auth/action';
import { useHistory } from 'react-router';

type State = { username: string; password: string; rePassword: string };

const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, user } = useTypeSelector(s => s.authState);
  const [state, setState] = useState<State>({ username: 'quatmer', password: '4mer', rePassword: '4mer' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log(state.password, state.rePassword);
    if (state.password !== state.rePassword) {
      setErrorMessage('password must be match');
    } else {
      setErrorMessage('');
    }
  }, [state.password, state.rePassword]);

  useEffect(() => {
    console.log('[SignUpForm] useEffect init');
    if (!!user) {
      history.replace('/');
    }
    return () => console.log('[SignUpForm] useEffect destroy');
    //eslint-disable-next-line
  }, [!!user]);

  const register = () => {
    dispatch(AuthActions.register(state.username, state.password));
  };

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
            <IonInput
              type="text"
              value={state.username}
              onIonChange={event => setState({ ...state, username: event.detail.value || '' })}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">
              password
              <IonText color="danger"> *</IonText>
            </IonLabel>
            <IonInput
              type="password"
              value={state.password}
              onIonChange={event => setState({ ...state, password: event.detail.value || '' })}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">
              re-password
              <IonText color="danger">
                {' '}
                * <IonNote color="danger">{errorMessage}</IonNote>
              </IonText>
            </IonLabel>
            <IonInput
              type="password"
              value={state.rePassword}
              onIonChange={event => setState({ ...state, rePassword: event.detail.value || '' })}
            />
          </IonItem>
        </IonList>
        <div id="auth-button-container" className="full-size content-center">
          <IonButton color="tertiary" disabled={!!errorMessage || loading} onClick={register}>
            {loading ? <IonSpinner name="dots" /> : 'Signup'}
          </IonButton>
        </div>

        <IonButton id="other-auth-button" fill="clear" color="medium" size="small" routerLink="/login">
          login
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default SignupForm;
