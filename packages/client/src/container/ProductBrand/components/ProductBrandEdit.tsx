import React, { useState } from 'react';
import TightModal from 'src/components/TightModal';
import { IonButton, IonInput, IonCol, IonList, IonItem, IonSpinner, IonIcon, IonLabel } from '@ionic/react';
import GridLayout from 'src/layouts/GridLayout';
import { useServices } from 'src/api/context/ServiceContext';
import { IProductBrand } from '@shared/models/product-brand';

type Props = {
  brand: IProductBrand;
  isEditMode: boolean;
  exitEditMode: () => void;
};

const ProductBrandEdit = (props: Props) => {
  const [name, setName] = useState(props.brand.name);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { BrandService } = useServices();

  const updateBrand = () => {
    setLoading(true);

    BrandService.update(props.brand._id, name)
      .then(() => {
        props.exitEditMode();
      })
      .catch(errorMessage => {
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <TightModal
      title="Edit Brand"
      description={`Edit brand`}
      isOpen={props.isEditMode}
      onDidDismiss={props.exitEditMode}>
      <GridLayout>
        <IonCol size="12">
          <IonList>
            <IonItem>
              <IonInput
                autofocus
                value={name}
                onIonChange={e => {
                  setName(e.detail.value || '');
                  setError('');
                }}
                onKeyUp={e => {
                  if (e.key === 'Enter') updateBrand();
                }}
              />
            </IonItem>
            <IonLabel className="error-label" color="danger">
              {error}
            </IonLabel>
          </IonList>
        </IonCol>
        <IonCol size="12" class="content-center">
          <IonButton disabled={!name || loading} onClick={updateBrand} class="full-width">
            {loading ? (
              <IonSpinner name="dots" />
            ) : (
              <>
                Update
                <IonIcon slot="end" />
              </>
            )}
          </IonButton>
        </IonCol>
      </GridLayout>
    </TightModal>
  );
};

export default ProductBrandEdit;
