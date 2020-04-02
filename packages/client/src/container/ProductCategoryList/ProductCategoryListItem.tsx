import React from 'react';
import { IProductCategory } from '@shared/models/product-category';
import {
  IonCard,
  IonItem,
  IonLabel,
  IonText,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
} from '@ionic/react';

type Props = { category: IProductCategory; isSelected: boolean };
const ProductCategoryListItem = (props: Props) => {
  const { category } = props;

  const getUnselectedView = () => {
    return (
      <IonItem>
        <IonLabel>
          <h2>{category.name}</h2>
          <p>
            has <IonText color="danger">{category.productCount}</IonText> product
          </p>
        </IonLabel>
      </IonItem>
    );
  };

  const getSelectedView = () => {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{category.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            {category.children.map(c => (
              <ProductCategoryListItem category={c} isSelected={false} />
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    );
  };

  return props.isSelected ? getSelectedView() : getUnselectedView();
};

export default ProductCategoryListItem;
