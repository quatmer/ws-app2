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
import ProductBrandList from 'src/container/ProductBrand/ProductBrandList';
import { add } from 'ionicons/icons';
import NewProduct from 'src/container/Product/components/NewProduct';

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
        <WideModal
          title="New Product"
          isOpen={isModalOpen}
          onDidDismiss={() => {
            closeModal();
          }}>
          <NewProduct />
        </WideModal>
      </IonContent>
    </IonPage>
  );
};

export default ProductPage;
