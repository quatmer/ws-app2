import { ProductCategoryNode } from '../../api/dto/product-category.dto';

const findAndToggleCategory = (id: string, categories: ProductCategoryNode[]): ProductCategoryNode[] => {
  const toggledCategories = [...categories];
  categories.forEach(category => {
    if (category._id === id) {
      categories.filter(c => c._id !== id).forEach(c => (c.isSelected = false));
      category.isSelected = !!!category.isSelected;
    } else {
      findAndToggleCategory(id, category.subCategories);
    }
  });

  return toggledCategories;
};

const ProductCategoryUtil = {
  findAndToggleCategory,
};

export default ProductCategoryUtil;
