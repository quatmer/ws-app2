import React, { useEffect, useState } from 'react';
import { useTypeSelector } from '../../../redux/helper/selector.helper';
import ProductListItem from './ProductListItem';
import { IonGrid } from '@ionic/react';
import { useServices } from '../../../api/context/ServiceContext';
import WideModal from '../../../components/WideModal';
import ProductCreateEdit from './ProductCreateEdit';
import { IProduct } from '../../../../../shared/models/product';
import ProductImageAddEdit from './ProductImageAddEdit';

const ProductList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);
  const { products } = useTypeSelector(p => p.productState);
  const { ProductService } = useServices();
  const [editedProduct, setEditedProduct] = useState<IProduct>();

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalImageOpen(false);
  };

  const editProduct = (product: IProduct) => {
    setEditedProduct(product);
    setIsModalOpen(true);
  };

  const editImage = (product: IProduct) => {
    setEditedProduct(product);
    setIsModalImageOpen(true);
  };

  useEffect(() => {
    ProductService.getList();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <IonGrid>
        {products.map(p => (
          <ProductListItem key={p._id} product={p} onEditProduct={() => editProduct(p)} onEditImage={() => editImage(p)} />
        ))}
      </IonGrid>
      <WideModal title="New Product" isOpen={isModalOpen} onDidDismiss={closeModal}>
        <ProductCreateEdit product={editedProduct} onCloseForm={closeModal} />
      </WideModal>

      <WideModal title="Product Image" isOpen={isModalImageOpen} onDidDismiss={closeModal}>
        <ProductImageAddEdit product={editedProduct} onCloseForm={closeModal} />
      </WideModal>
    </>
  );
};

export default ProductList;
