import React from 'react';
import WideModal from '../components/WideModal';

const ProductPage = () => {
  return (
    <div>
      <WideModal title="New Product" isOpen={true} onDidDismiss={() => {}} />
    </div>
  );
};

export default ProductPage;
