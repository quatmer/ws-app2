import React, { useState, useEffect, useRef } from 'react';
import { IProductCategory } from '@shared/models/product-category';
import { IonCol, IonList, IonItem, IonLabel, IonText, IonInput, IonButton, IonSpinner, IonIcon } from '@ionic/react';
import { sync, createOutline } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../redux/helper/selector.helper';
import { ProductCategoryActions } from '../../../redux/product-category/action';
import { AppUtil } from '../../../api/utils/app.util';
import GridLayout from '../../../layouts/GridLayout';

type Props = {
  parentId: string | null;
  category?: IProductCategory;
  onCloseForm: () => void;
};
const ProductCategoryEdit = ({ category, onCloseForm, parentId }: Props) => {
  const { loading, error } = useTypeSelector(s => s.productCategoryState);
  const [categoryName, setCategoryName] = useState(category?.name || '');
  const [formType, setFormType] = useState<'create' | 'update'>('create');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!category) {
      setFormType('update');
    }
    //eslint-disable-next-line
  }, []);

  const refLoading = useRef(loading);
  useEffect(() => {
    console.log(refLoading, loading, error);

    if (refLoading.current && !loading && error === null) {
      onCloseForm();
    } else {
      refLoading.current = loading;
    }

    //eslint-disable-next-line
  }, [loading]);

  const createUpdate = () => {
    if (formType === 'create') {
      dispatch(
        ProductCategoryActions.create({
          _id: AppUtil.getUID(),
          name: categoryName,
          parentId: parentId,
          productCount: 0,
        }),
      );
    }

    if (formType === 'update') {
      dispatch(
        ProductCategoryActions.update({
          ...category!,
          name: categoryName,
        }),
      );
    }
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
            <>
              {formType === 'update' ? 'Update' : 'Create'}
              <IonIcon slot="end" icon={formType === 'update' ? sync : createOutline} />
            </>
          )}
        </IonButton>
      </IonCol>
    </GridLayout>
  );
};

export default ProductCategoryEdit;
