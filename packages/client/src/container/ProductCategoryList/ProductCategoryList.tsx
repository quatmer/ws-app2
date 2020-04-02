import React from 'react';
import { useTypeSelector } from 'src/redux/helper/selector.helper';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import ProductCategoryListItem from './ProductCategoryListItem';

const ProductCategoryList = () => {
  const { categories } = useTypeSelector(c => c.productCategoryState);

  return (
    <IonGrid>
      <IonRow>
        {categories.map(c => {
          return (
            <IonCol>
              <ProductCategoryListItem category={c} isSelected={false} />
            </IonCol>
          );
        })}
      </IonRow>
    </IonGrid>
  );
};

export default ProductCategoryList;
