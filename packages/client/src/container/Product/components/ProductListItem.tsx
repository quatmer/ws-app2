import React, { useState } from 'react';
import { IonItem, IonButton, IonButtons, IonIcon, IonSpinner, IonLabel, IonBadge, IonAlert } from '@ionic/react';
import { createOutline, trashOutline, imagesOutline } from 'ionicons/icons';
import { IProduct } from '../../../../../shared/models/product';
import { useServices } from '../../../api/context/ServiceContext';
import { useIsMounted } from '../../../api/utils/react.util';

type Props = { product: IProduct; onEditImage: () => void; onEditProduct: () => void };

const ProductListItem = (props: Props) => {
  const mount = useIsMounted(); //const mount = useIsMounted('ProductListItem');
  const [loading, setLoading] = useState(false);
  const { ProductService } = useServices();
  const [showAlert, setShowAlert] = useState(false);

  const deleteProduct = () => {
    setLoading(true);
    ProductService.delete(props.product._id).finally(() => mount.current && setLoading(false));
  };

  return (
    <div className="product-list-item">
      <IonItem>
        <IonLabel>
          <h3>{props.product.name}</h3>
          <p>{props.product.brand.name}</p>
          <p>
            {props.product.categories.map(c => (
              <IonBadge key={c._id} style={{ marginLeft: '5px' }} color="danger">
                {c.name}
              </IonBadge>
            ))}
          </p>
        </IonLabel>
        {loading ? (
          <IonSpinner slot="end" />
        ) : (
            <IonButtons slot="end">
              <IonButton fill="clear" onClick={() => props.onEditImage()}>
                <IonIcon slot="icon-only" icon={imagesOutline} />
              </IonButton>
              <IonButton fill="clear" onClick={() => props.onEditProduct()}>
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
          message={'Do you want delete <strong>' + props.product.name + '</strong>?'}
          buttons={[
            {
              text: 'Cancel',
              cssClass: 'secondary',
            },
            {
              text: 'Delete',
              handler: () => {
                deleteProduct();
              },
            },
          ]}
        />
      </IonItem>
    </div>
  );
};

export default ProductListItem;
