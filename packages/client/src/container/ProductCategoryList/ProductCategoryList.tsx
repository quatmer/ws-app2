import React, { useEffect } from 'react';
import { useTypeSelector } from 'src/redux/helper/selector.helper';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import ProductCategoryListItem from './ProductCategoryListItem';
import { useDispatch } from 'react-redux';
import { ProductCategoryActions } from '../../redux/product-category/action';

const ProductCategoryList = () => {
  const { categories } = useTypeSelector(c => c.productCategoryState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ProductCategoryActions.getList());
    // eslint-disable-next-line
  }, []);

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
