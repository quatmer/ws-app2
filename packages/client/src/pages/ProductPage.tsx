import React, { useState } from 'react';
import WideModal from '../components/WideModal';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import ProductList from '../container/Product/components/ProductList';
import ProductCreateEdit from '../container/Product/components/ProductCreateEdit';

const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={openModal}>
              Add New Product
              <IonIcon slot="start" icon={add} />
            </IonButton>
          </IonButtons>
          <IonTitle>Product</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProductList />
        <WideModal title="New Product" isOpen={isModalOpen} onDidDismiss={closeModal}>
          <ProductCreateEdit onCloseForm={closeModal} />
        </WideModal>
      </IonContent>
    </IonPage>
  );
};

export default ProductPage;
