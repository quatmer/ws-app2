import React, { useEffect, useState, useRef } from 'react';
import { IonLabel, IonItem, IonList, IonButton, IonCol, IonSelectOption, IonIcon } from '@ionic/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import IonFormikField from '../../../components/formik/IonFormikField';
import IonFormikError from '../../../components/formik/IonFormikError';
import { IProductDTO } from '../../../api/dto/product.dto';
import { useTypeSelector } from '../../../redux/helper/selector.helper';
import { useServices } from '../../../api/context/ServiceContext';
import IonFormikSelect from '../../../components/formik/IonSelectField';
import { IProduct } from '../../../../../shared/models/product';
import { sync, createOutline } from 'ionicons/icons';

type Props = {
  product?: IProduct;
  onCloseForm: () => void;
};

const ProductCreateEdit = (props: Props) => {
  const { loading, error } = useTypeSelector(s => s.productCategoryState);
  const [formType] = useState<'create' | 'update'>(!props.product ? 'create' : 'update');

  const { brands } = useTypeSelector(x => x.productBrandState);
  const { categories } = useTypeSelector(x => x.productCategoryState);
  const { ProductService: productService } = useServices();

  const formInitialValue: IProductDTO = props.product
    ? {
        name: props.product.name,
        description: props.product.description,
        brand: props.product.brand._id,
        price: props.product.price,
        categories: props.product.categories.map(c => c._id),
        unit: props.product.unit,
      }
    : {
        name: '',
        description: '',
        unit: '',
        price: 0,
        categories: [],
        brand: '',
      };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    description: Yup.string().required('Description is required!'),
    unit: Yup.string().required('Unit is required!'),
    price: Yup.number().required('Price is required!').min(0, 'Minimum price must be equal or grater than zero.'),
    categories: Yup.array<string>().required('Categories is required!'),
    brand: Yup.string().required('Brand is required!'),
  });

  const refLoading = useRef(loading);
  useEffect(() => {
    console.log(refLoading, loading, error);

    if (refLoading.current && !loading && error === null) {
      props.onCloseForm();
    } else {
      refLoading.current = loading;
    }
    //eslint-disable-next-line
  }, [loading]);

  const handleSubmitForm = (values: IProductDTO) => {
    if (formType === 'create') {
      productService
        .create(values)
        .then(product => {
          console.log('Created product:', product);
          props.onCloseForm();
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    }

    if (formType === 'update') {
      values.id = props.product?._id;
      productService
        .update(values)
        .then(uProduct => {
          console.log('Updated product: ', uProduct);
          props.onCloseForm();
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    }
  };

  return (
    <Formik initialValues={formInitialValue} validationSchema={validationSchema} onSubmit={handleSubmitForm}>
      {() => {
        return (
          <Form>
            <IonList>
              <IonItem>
                <IonLabel color="tertiary" position="floating">
                  Name
                </IonLabel>
                <IonFormikField name="name" />
                <IonFormikError name="name" />
              </IonItem>

              <IonItem>
                <IonLabel color="tertiary" position="floating">
                  Description
                </IonLabel>
                <IonFormikField rowCount={4} name="description" />
                <IonFormikError name="description" />
              </IonItem>

              <IonItem>
                <IonLabel color="tertiary" position="floating">
                  Unit
                </IonLabel>
                <IonFormikField name="unit" />
                <IonFormikError name="unit" />
              </IonItem>

              <IonItem>
                <IonLabel color="tertiary" position="floating">
                  Price
                </IonLabel>
                <IonFormikField name="price" />
                <IonFormikError name="price" />
              </IonItem>

              <IonItem>
                <IonLabel color="tertiary" position="floating">
                  Brand
                </IonLabel>
                <IonFormikSelect name="brand">
                  {brands.map(item => (
                    <IonSelectOption key={item._id} value={item._id}>
                      {item.name}
                    </IonSelectOption>
                  ))}
                </IonFormikSelect>
                <IonFormikError name="brand" />
              </IonItem>

              <IonItem>
                <IonLabel color="tertiary" position="floating">
                  Category
                </IonLabel>
                <IonFormikSelect name="categories" multiple={true}>
                  {categories.map(item => (
                    <IonSelectOption key={item._id} value={item._id}>
                      {item.name}
                    </IonSelectOption>
                  ))}
                </IonFormikSelect>
              </IonItem>

              <IonCol size="12" class="content-center">
                <IonButton class="full-width" type="submit">
                  <>
                    {formType === 'update' ? 'Update' : 'Save'}
                    <IonIcon slot="end" icon={formType === 'update' ? sync : createOutline} />
                  </>
                </IonButton>
              </IonCol>
            </IonList>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductCreateEdit;
