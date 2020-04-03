import './ProductCategoryList.scss';
import React, { useEffect } from 'react';
import { useTypeSelector } from 'src/redux/helper/selector.helper';
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
    <div id="product-category-list">
      {categories.map(c => {
        return <ProductCategoryListItem key={c._id} category={c} />;
      })}
    </div>
  );
};

export default ProductCategoryList;
