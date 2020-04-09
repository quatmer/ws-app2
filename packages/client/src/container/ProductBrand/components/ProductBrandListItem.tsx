import React, { useState } from 'react';
import { IProductBrand } from '@shared/models/product-brand';
import { useDispatch } from 'react-redux';
import { IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { createOutline, trash, tvOutline } from 'ionicons/icons';
import { ProductBrandActions } from 'src/redux/product-brand/action';
import TightModal from 'src/components/TightModal';
import ProductBrandCreateEdit from './ProductBrandCreateEdit';
import { AppService } from 'src/api/services/app.service';

type Props = { brand: IProductBrand };
type State = { showForm: boolean };

const ProductBrandListItem = (prop: Props) => {
  const [state, setState] = useState<State>({ showForm: false });
  const dispatch = useDispatch();

  const actionButtons = (
    <IonButtons slot="end" id="action-buttons">
      {/* edit button */}
      <IonButton
        fill="clear"
        color="tertiary"
        onClick={event => {
          event.stopPropagation();
          setState({ showForm: true });
        }}>
        <IonIcon slot="icon-only" icon={createOutline} />
      </IonButton>

      {/* delete button */}
      <IonButton
        fill="clear"
        color="danger"
        onClick={event => {
          event.stopPropagation();
          dispatch(ProductBrandActions.delete(prop.brand._id));
        }}>
        <IonIcon slot="icon-only" icon={trash} />
      </IonButton>
    </IonButtons>
  );

  // <TightModal
  //   title="Create new product brand"
  //   // description="Enter new brand name ..."
  //   isOpen={showForm}
  //   onDidDismiss={() => setShowForm(false)}>
  //   <ProductBrandCreateEdit brand={null} onCloseForm={() => setShowForm(false)} />
  // </TightModal>;

  const createUpdateModal = (
    <TightModal
      title="Write brand's new name"
      // description={`Creating new brand`}
      isOpen={state.showForm}
      onDidDismiss={() => setState({ showForm: false })}>
      <ProductBrandCreateEdit
        brand={prop.brand}
        onCloseForm={() => {
          setState({ showForm: false });
        }}
      />
    </TightModal>
  );

  return (
    <div id="product-brand">
      {createUpdateModal}
      <IonItem id="product-brand-item" key={prop.brand._id || AppService.getUID()}>
        <IonIcon icon={tvOutline} slot="start" />
        <IonLabel>
          <h2>{prop.brand.name}</h2>
          <IonText color="success">{prop.brand._id}</IonText>
        </IonLabel>

        {actionButtons}
      </IonItem>
    </div>
  );
};

export default ProductBrandListItem;
