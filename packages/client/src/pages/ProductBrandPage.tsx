import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react';
import ProductBrandList from '../container/ProductBrand/ProductBrandList';

const ProductBrandPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Brands</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProductBrandList />
      </IonContent>
    </IonPage>
  );
};

export default ProductBrandPage;
