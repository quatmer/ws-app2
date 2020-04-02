import React, { useState } from 'react';
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
import { ProductCategoryDTO } from 'src/redux/product-category/reducer';
import { useDispatch } from 'react-redux';
import { ProductCategoryActions } from 'src/redux/product-category/action';

type Props = { category: ProductCategoryDTO; isSelected: boolean };
const ProductCategoryListItem = (props: Props) => {
  const { category } = props;
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(ProductCategoryActions.toggleSelect(category._id));
  };

  const getUnselectedView = () => {
    return (
      <IonItem onClick={toggle}>
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
        <IonCardHeader onClick={toggle}>
          <IonCardTitle>{category.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            {category.children.map(c => (
              <ProductCategoryListItem key={c._id} category={c} isSelected={!!category.isSelected} />
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    );
  };

  return category.isSelected ? getSelectedView() : getUnselectedView();
};

export default ProductCategoryListItem;
