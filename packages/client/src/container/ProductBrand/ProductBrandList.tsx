import React, { useEffect, useState } from 'react';
import ProductBrandListItem from './components/ProductBrandListItem';
import './ProductBrandList.scss';
import NewProductBrand from './components/NewProductBrand';
import { IonSpinner } from '@ionic/react';
import { useServices } from '../../api/context/ServiceContext';
import { useTypeSelector } from '../../redux/helper/selector.helper';

const ProductBrandList = () => {
  const { brands } = useTypeSelector(x => x.productBrandState);
  const { BrandService } = useServices();
  const [loading, setLoading] = useState(false);
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(true);
    }, 400);

    setLoading(true);
    BrandService.getList()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="brand">
      <div className="title">
        {loading && delayed ? <IonSpinner /> : <></>}
        <h3>List of Brand</h3>
      </div>
      <h6>
        <strong>Brands</strong> are added to products for categorization purpose
      </h6>
      <NewProductBrand />
      <div className="table-header">Name</div>
      {brands.map(item => {
        return <ProductBrandListItem key={item._id} brand={item} />;
      })}
    </div>
  );
};

export default ProductBrandList;
