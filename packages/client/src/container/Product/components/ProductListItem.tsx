import React, { useState } from 'react';
import { IonItem, IonButton, IonButtons, IonIcon, IonSpinner, IonLabel, IonBadge } from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';
import { IProduct } from '../../../../../shared/models/product';
import { useServices } from '../../../api/context/ServiceContext';
import { useIsMounted } from '../../../api/utils/react.util';

type Props = { product: IProduct; onEditProduct: () => void };

const ProductListItem = (props: Props) => {
  const mount = useIsMounted(); //const mount = useIsMounted('ProductListItem');
  const [loading, setLoading] = useState(false);
  const { ProductService: productService } = useServices();

  const deleteProduct = () => {
    setLoading(true);
    productService.delete(props.product._id).finally(() => mount.current && setLoading(false));
  };

  return (
    <div className="product-list-item">
      {/* <ProductEdit brand={props.brand} exitEditMode={exitEditModeHandler} isEditMode={isEditMode} /> */}
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
            <IonButton fill="clear" onClick={() => props.onEditProduct()}>
              <IonIcon slot="icon-only" icon={createOutline} />
            </IonButton>
            <IonButton fill="clear" color="danger" onClick={() => deleteProduct()}>
              <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
          </IonButtons>
        )}
      </IonItem>
    </div>
  );
};

export default ProductListItem;
