import React from 'react';
import ProductCategoryList from 'src/container/ProductCategoryList/ProductCategoryList';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react';

const ProductCategoryPage = () => {
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
      </IonContent>
    </IonPage>
  );
};

export default ProductCategoryPage;
