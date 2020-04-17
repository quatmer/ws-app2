import React, { useState } from 'react';
import { IonItem, IonButton, IonButtons, IonIcon, IonSpinner, IonAlert } from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';
import ProductBrandEdit from './ProductBrandEdit';
import { IProductBrand } from '@shared/models/product-brand';
import { useServices } from '../../../api/context/ServiceContext';

type Props = { brand: IProductBrand };

const ProductBrandListItem = (props: Props) => {
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { BrandService } = useServices();
  const [showAlert, setShowAlert] = useState(false);

  const deleteBrand = () => {
    setLoading(true);
    BrandService.delete(props.brand._id)
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
            <IonButton fill="clear" color="danger" onClick={() => setShowAlert(true)}>
              <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
          </IonButtons>
        )}

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Delete Confirmation'}
          message={'Do you want delete <strong>' + props.brand.name + '</strong>?'}
          buttons={[
            {
              text: 'Cancel',
              cssClass: 'secondary',
            },
            {
              text: 'Delete',
              handler: () => {
                deleteBrand();
              },
            },
          ]}
        />
      </IonItem>
    </div>
  );
};

export default ProductBrandListItem;
