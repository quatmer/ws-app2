import React from 'react';
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
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { logOutSharp } from 'ionicons/icons';
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useServices } from '../api/context/ServiceContext';

const HomePage = () => {
  const { Auth } = useServices();

  const logout = () => {
    Auth.logout();
  };

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
        <IonGrid>
          <IonRow>
            <div>
              <Button type="primary">Primary</Button>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="link">Link</Button>
            </div>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
            </IonCol>
            <IonCol size="12">
              <h2 id="test">TEst</h2>
            </IonCol>
            <IonCol size="12"></IonCol>
            <IonCol size="12"></IonCol>
          </IonRow>
        </IonGrid>
        <div id="wide-modal">
          <div id="toolbar">
            <div id="title">
              <h3>Title</h3>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
