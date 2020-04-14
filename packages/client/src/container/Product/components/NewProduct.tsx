import React, { useEffect } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonCol,
  IonSelectOption,
} from '@ionic/react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import IonFormikField from '../../../components/formik/IonFormikField';
import IonFormikError from '../../../components/formik/IonFormikError';
import { IProductDTO } from '../../../api/dto/product.dto';
import { useTypeSelector } from '../../../redux/helper/selector.helper';
import { useServices } from '../../../api/context/ServiceContext';
import { ProductCategoryActions } from '../../../redux/product-category/action';
import IonFormikSelect from '../../../components/formik/IonSelectField';


const NewProduct = () => {
  const { brands } = useTypeSelector(x => x.productBrandState);
  const { categories } = useTypeSelector(x => x.productCategoryState);
  const { brandService } = useServices();
  const { productService } = useServices();
  const dispatch = useDispatch()


  useEffect(() => {
    if (brands.length === 0) {
      brandService.getList();
    }
    if (categories.length === 0) {
      dispatch(ProductCategoryActions.getList())
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmitForm = (values: IProductDTO) => {

    console.log('Form Values:', values);
    productService.create(values).then((product) => {
      console.log('Created product:', product)
    }
    ).catch((error) => {
      console.log("Error ", error)
    }
    );

  };

  const formInitialValue: IProductDTO = { name: 'Televizyon', description: 'LCD', unit: 'adet', price: 1000, categories: [], brand: '' };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    description: Yup.string().required('Description is required!'),
    unit: Yup.string().required('Unit is required!'),
    price: Yup.number().required('Price is required!'),
    categories: Yup.array<string>().required('Categories is required!'),
    brand: Yup.string().required('Brand is required!'),
  });

  return (
    <Formik initialValues={formInitialValue} validationSchema={validationSchema} onSubmit={handleSubmitForm}>
      {() => {
        return (
          <Form>
            <IonList>
              <IonItem >
                <IonLabel color='tertiary' position="floating"  >Name</IonLabel>
                <IonFormikField name='name' />
                <IonFormikError name='name' />
              </IonItem>

              <IonItem >
                <IonLabel color='tertiary' position="floating">Description</IonLabel>
                <IonFormikField rowCount={4} name='description' />
                <IonFormikError name='description' />
              </IonItem>

              <IonItem >
                <IonLabel color='tertiary' position="floating">Unit</IonLabel>
                <IonFormikField name='unit' />
                <IonFormikError name='unit' />
              </IonItem>

              <IonItem >
                <IonLabel color='tertiary' position="floating">Price</IonLabel>
                <IonFormikField name='price' />
                <IonFormikError name='price' />
              </IonItem>

              <IonItem >
                <IonLabel color='tertiary' position="floating">Brand</IonLabel>
                <IonFormikSelect name='brand'>
                  {
                    brands.map(item => <IonSelectOption key={item._id} value={item._id}>{item.name}</IonSelectOption>)
                  }
                </IonFormikSelect>
                <IonFormikError name='brand' />
              </IonItem>

              <IonItem >
                <IonLabel color='tertiary' position="floating">Category</IonLabel>
                <IonFormikSelect name='categories' multiple={true}>
                  {categories.map(item => (
                    <IonSelectOption key={item._id} value={item._id}>{item.name}</IonSelectOption>
                  ))}
                </IonFormikSelect>
              </IonItem>

              <IonCol size="12" class="content-center">
                <IonButton class="full-width" type="submit" >SAVE</IonButton>
              </IonCol>
            </IonList>
          </Form>
        )
      }}
    </Formik>
  );
};

export default NewProduct;
