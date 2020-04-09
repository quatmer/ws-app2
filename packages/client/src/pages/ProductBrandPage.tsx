import React, { useState } from 'react';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import { logOutSharp, add } from 'ionicons/icons';
import { AuthActions } from 'src/redux/auth/action';
import { useDispatch } from 'react-redux';
import ProductBrandList from 'src/container/ProductBrand/ProductBrandList';
import TightModal from 'src/components/TightModal';
import ProductBrandCreateEdit from 'src/container/ProductBrand/components/ProductBrandCreateEdit';

const ProductBrandPage = () => {
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Product Brand Page</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              Logout
              <IonIcon slot="end" icon={logOutSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProductBrandList />
        <TightModal
          title="Create New Product Brand"
          // description="Enter new brand name ..."
          isOpen={showForm}
          onDidDismiss={() => setShowForm(false)}>
          <ProductBrandCreateEdit brand={null} onCloseForm={() => setShowForm(false)} />
        </TightModal>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="success" onClick={() => setShowForm(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ProductBrandPage;
