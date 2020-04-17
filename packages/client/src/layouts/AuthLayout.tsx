import React, { FC, useEffect } from 'react';
import GridLayout from './GridLayout';
import { IonCol } from '@ionic/react';
import { useHistory } from 'react-router';
import { useTypeSelector } from '../redux/helper/selector.helper';

type Props = { redirectPath?: string };

const AuthLayout: FC<Props> = props => {
  const { redirectPath = '/' } = props;
  const { user } = useTypeSelector(s => s.authState);
  const history = useHistory();
  useEffect(() => {
    console.log('[AuthLayout] useEffect init');
    if (!!user) {
      history.replace(redirectPath);
    }
    return () => console.log('[AuthLayout] useEffect destroy');
    //eslint-disable-next-line
  }, [!!user]);

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
