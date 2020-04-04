import { ProductCategoryDTO } from '../product-category/reducer';
import { IProductCategory } from '@shared/models/product-category';

const findAndToggleCategory = (id: string, categories: ProductCategoryDTO[]): ProductCategoryDTO[] => {
  const toggledCategories = [...categories];
  categories.forEach(category => {
    if (category._id === id) {
      categories.filter(c => c._id !== id).forEach(c => (c.isSelected = false));
      category.isSelected = !!!category.isSelected;
    } else {
      findAndToggleCategory(id, category.children);
    }
  });

  return toggledCategories;
};

export const deleteEmptyIds = (category: IProductCategory) => {
  if (!category._id) {
    delete category._id;
  }
  category.children.forEach(child => deleteEmptyIds(child));
};

const ProductCategoryUtil = {
  findAndToggleCategory,
  deleteEmptyIds,
};

export default ProductCategoryUtil;
