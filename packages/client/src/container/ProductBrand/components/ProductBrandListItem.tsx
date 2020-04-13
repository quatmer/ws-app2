import React, { useState } from 'react';
import { IonItem, IonButton, IonButtons, IonIcon, IonSpinner } from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';
import ProductBrandEdit from './ProductBrandEdit';
import { useServices } from 'src/api/context/ServiceContext';
import { IBrand } from '@shared/models/product-brand';

type Props = { brand: IBrand };

const ProductBrandListItem = (props: Props) => {
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { brandService } = useServices();

  const deleteBrand = () => {
    setLoading(true);
    brandService
      .delete(props.brand._id)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const editBrand = () => {
    setEditMode(true);
  };

  const exitEditModeHandler = () => {
    setEditMode(false);
  };

  return (
    <div className="brand-list-item">
      <ProductBrandEdit brand={props.brand} exitEditMode={exitEditModeHandler} isEditMode={isEditMode} />
      <IonItem>
        {props.brand.name}

        {loading ? (
          <IonSpinner slot="end" />
        ) : (
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => editBrand()}>
              <IonIcon slot="icon-only" icon={createOutline} />
            </IonButton>
            <IonButton fill="clear" color="danger" onClick={() => deleteBrand()}>
              <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
          </IonButtons>
        )}
      </IonItem>
    </div>
  );
};

export default ProductBrandListItem;
