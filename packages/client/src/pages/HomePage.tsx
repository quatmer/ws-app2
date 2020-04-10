import React, { useState, useEffect, useRef } from 'react';
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonCol,
} from '@ionic/react';
import { logOutSharp } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { AuthActions } from 'src/redux/auth/action';
import WideModal from 'src/components/WideModal';
import GridLayout from 'src/layouts/GridLayout';

const HomePage = () => {
  console.log('[HomePage]: init');

  let counter2 = 0;

  const counter3 = useRef<number>(0);

  const [counter, setCounter] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(AuthActions.logout());
  };

  useEffect(() => {
    console.log('[HomePage]: effect init');
    return () => {
      console.log('[HomePage]: effect destroy');
    };
  }, []);

  useEffect(() => {
    console.log('[HomePage]: effect counter init');
    return () => {
      console.log('[HomePage]: effect counter destroy');
    };
  }, [counter]);

  useEffect(() => {
    console.log(counter2);

    console.log('[HomePage]: effect counter2 init');
    return () => {
      console.log('[HomePage]: effect counter2 destroy');
    };
  }, [counter2]);

  useEffect(() => {
    console.log(counter3.current);

    console.log('[HomePage]: effect counter3 init');
    return () => {
      console.log('[HomePage]: effect counter3 destroy');
    };
    // eslint-disable-next-line
  }, [counter3.current]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home Page</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon slot="icon-only" icon={logOutSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <WideModal title="test" isOpen={openModal} onDidDismiss={() => setOpenModal(false)}></WideModal>
        <IonButton class="ion-margin" onClick={() => setOpenModal(true)}>
          Show Modal
        </IonButton>

        <GridLayout>
          <IonCol size="4" class="content-center">
            <h1>{counter}</h1>
          </IonCol>
          <IonCol size="4" class="content-center">
            <h1>{counter2}</h1>
          </IonCol>
          <IonCol size="4" class="content-center">
            <h1>{counter3.current}</h1>
          </IonCol>
          <IonCol size="12" class="content-center">
            <IonButton
              onClick={() => {
                setCounter(counter + 1);
                counter2++;
                counter3.current++;
              }}>
              increase
            </IonButton>
          </IonCol>
        </GridLayout>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
