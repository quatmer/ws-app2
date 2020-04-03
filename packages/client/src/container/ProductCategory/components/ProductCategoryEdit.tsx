import React, { useState, useEffect } from 'react';
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonCol, IonText, IonSpinner } from '@ionic/react';
import { IProductCategory } from '@shared/models/product-category';
import { createOutline, sync } from 'ionicons/icons';
import GridLayout from 'src/layouts/GridLayout';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { ProductCategoryActions } from 'src/redux/product-category/action';
import { useTypeSelector } from 'src/redux/helper/selector.helper';

type Props = { category?: IProductCategory; onCloseForm: () => void };
const ProductCategoryEdit = (props: Props) => {
  const [categoryName, setCategoryName] = useState(props.category?.name || '');
  const { loading, error, categories } = useTypeSelector(s => s.productCategoryState);
  const dispatch = useDispatch();
  const { category } = props;

  useEffect(() => {
    if (!loading && error === null) {
      props.onCloseForm();
    }
  }, [categories]);

  const createUpdate = () => {
    console.log(category);

    const updatedCategory: IProductCategory = !!category
      ? { ...category, name: categoryName }
      : { _id: uuid(), children: [], name: categoryName, productCount: 0 };

    dispatch(ProductCategoryActions.createUpdate(updatedCategory));
  };

  return (
    <GridLayout>
      <IonCol size="12">
        <IonList>
          <IonItem>
            <IonLabel position="floating" color="tertiary">
              category name <IonText color="danger"> *</IonText>
            </IonLabel>
            <IonInput value={categoryName} onIonChange={e => setCategoryName(e.detail.value || '')} />
          </IonItem>
        </IonList>
      </IonCol>
      <IonCol size="12" class="content-center">
        <IonButton disabled={!categoryName || loading} onClick={createUpdate} class="full-width">
          {loading ? (
            <IonSpinner name="dots" />
          ) : (
            <div>
              {!!category ? 'Update' : 'Create'} <IonIcon slot="end" icon={!!category ? sync : createOutline} />
            </div>
          )}
        </IonButton>
      </IonCol>
    </GridLayout>
  );
};

export default ProductCategoryEdit;
