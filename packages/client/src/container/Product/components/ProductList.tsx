import React, { useEffect, useState } from 'react';
import { useTypeSelector } from '../../../redux/helper/selector.helper';
import ProductListItem from './ProductListItem';
import { IonGrid } from '@ionic/react';
import { useServices } from '../../../api/context/ServiceContext';
import WideModal from '../../../components/WideModal';
import ProductCreateEdit from './ProductCreateEdit';
import { IProduct } from '../../../../../shared/models/product';

const ProductList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products } = useTypeSelector(p => p.productState);
  const { ProductService: productService } = useServices();
  const [editedProduct, setEditedProduct] = useState<IProduct>();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editProduct = (product: IProduct) => {
    setEditedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    productService.getList();
  }, []);

  return (
    <>
      <IonGrid>
        {products.map(p => (
          <ProductListItem key={p._id} product={p} onEditProduct={() => editProduct(p)} />
        ))}
      </IonGrid>
      <WideModal title="New Product" isOpen={isModalOpen} onDidDismiss={closeModal}>
        <ProductCreateEdit product={editedProduct} onCloseForm={closeModal} />
      </WideModal>
    </>
  );
};

export default ProductList;
