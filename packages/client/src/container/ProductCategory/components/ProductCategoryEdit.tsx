import React, { useState, useEffect, useRef } from 'react';
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonCol, IonText, IonSpinner } from '@ionic/react';
import { IProductCategory } from '@shared/models/product-category';
import { createOutline, sync } from 'ionicons/icons';
import GridLayout from 'src/layouts/GridLayout';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { ProductCategoryActions } from 'src/redux/product-category/action';
import { useTypeSelector } from 'src/redux/helper/selector.helper';

//  parent-category varsa ve category yoksa: parent altina yeni category
//  parent-category yoksa ve category varsa: mevcut category update edilecek
//  parent-category yoksa ve category yoksa: root kateori olusturulacak
type Props = {
  category?: IProductCategory;
  parentCategory?: IProductCategory;
  onCloseForm: () => void;
};
const ProductCategoryEdit = ({ onCloseForm, category, parentCategory }: Props) => {
  const { categories } = useTypeSelector(s => s.productCategoryState);
  const [categoryName, setCategoryName] = useState(category?.name || '');
  const [formType, setFormType] = useState<'create' | 'update'>('create');
  const { loading, error } = useTypeSelector(s => s.productCategoryState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!category) {
      setFormType('update');
    }
    //eslint-disable-next-line
  }, []);

  //  useRef ile oluşturulan degiskenler sayfa render indan etilenmezler,
  //  state in bunlardan farki state degiskenleri ui ile etkilesimdedir
  //  create & update isleminin bitmesini kontrol ediyor ve pencereyi kapatiyoruz
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
    console.log(parentCategory, category);

    //root parent guncelle
    if (parentCategory && parentCategory._id) {
      if (category) {
        //kategoriyi bul ve guncelle
        let child = parentCategory.children.find(c => c._id === category._id);
        if (child) {
          child.name = categoryName;
        }
      } else {
        //yeni child kategori ekle
        const newCategory: IProductCategory = {
          _id: '',
          children: [],
          name: categoryName,
          productCount: 0,
        };
        parentCategory.children.push(newCategory);
      }

      // root parent i bulup db de guncelle
      console.log(category?._id || parentCategory._id);

      const rootParent = findRoot(categories, category?._id || parentCategory._id);
      console.log(rootParent);

      if (rootParent) {
        dispatch(ProductCategoryActions.update(rootParent));
      }
    }

    // root kategori guncelleniyor
    if (!parentCategory && category) {
      const updatedCategory = { ...category, name: categoryName };
      dispatch(ProductCategoryActions.update(updatedCategory));
    }
    //root parent olustur
    if (!category && !parentCategory) {
      const _id = uuid();
      const newCategory: IProductCategory = {
        _id,
        children: [],
        name: categoryName,
        productCount: 0,
      };
      dispatch(ProductCategoryActions.create(newCategory, _id));
    }
  };

  return (
    <GridLayout>
      {!!parentCategory && <IonCol size="12"> parent:{parentCategory.name}</IonCol>}
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

const findRoot = (categories: IProductCategory[], childId: string): IProductCategory | null => {
  let root: IProductCategory | null = null;
  categories.forEach(rootCat => {
    const childIds = getChildIds(rootCat);

    const isIdExist = rootCat._id === childId || !!childIds.find(id => id === childId);
    if (isIdExist) {
      root = rootCat;
    }
  });

  return root;
};

const getChildIds = (category: IProductCategory): string[] => {
  const ids: any[] = [...category.children.map(x => x._id)];

  category.children.forEach(child => {
    ids.push(...getChildIds(child));
  });

  return ids;
};
