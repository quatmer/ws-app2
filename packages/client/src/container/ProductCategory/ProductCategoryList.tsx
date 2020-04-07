import './ProductCategoryList.scss';
import React, { useEffect, useState } from 'react';
import { useTypeSelector } from 'src/redux/helper/selector.helper';
import ProductCategoryListItem from './components/ProductCategoryListItem';
import { useDispatch } from 'react-redux';
import { ProductCategoryActions } from '../../redux/product-category/action';
import { ProductCategoryNode } from 'src/api/dto/product-category.dto';
import ProductCategoryServices from 'src/api/services/product-category.service';
import Loading from 'src/components/Loading';

const ProductCategoryList = () => {
  const { categories, loading } = useTypeSelector(c => c.productCategoryState);
  const [categoryTree, setCategoryTree] = useState<ProductCategoryNode[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ProductCategoryActions.getList());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const tree = ProductCategoryServices.getCategoryTree(categories);
    setCategoryTree(tree);
  }, [categories]);

  const handleOnToggle = (node: ProductCategoryNode) => {
    const tree = ProductCategoryServices.findAndToggleCategory(node._id, categoryTree);
    setCategoryTree(tree);
  };

  return loading ? (
    <Loading />
  ) : (
    <div id="product-category-list">
      {categoryTree.map(c => {
        return <ProductCategoryListItem key={c._id} category={c} onToggle={handleOnToggle} />;
      })}
    </div>
  );
};

export default ProductCategoryList;
