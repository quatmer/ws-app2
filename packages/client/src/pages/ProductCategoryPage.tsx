import React, { useState } from 'react';
import ProductCategoryList from 'src/container/ProductCategory/ProductCategoryList';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import TightModal from 'src/components/TightModal';
import ProductCategoryEdit from 'src/container/ProductCategory/components/ProductCategoryEdit';

const ProductCategoryPage = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Product Category Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProductCategoryList />
        <TightModal
          title="new product category"
          description="You will create root category"
          isOpen={showForm}
          onDidDismiss={() => setShowForm(false)}>
          <ProductCategoryEdit
            parentId={null}
            onCloseForm={() => {
              setShowForm(false);
            }}
          />
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

export default ProductCategoryPage;
