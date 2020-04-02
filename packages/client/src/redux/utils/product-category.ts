import { ProductCategoryDTO } from '../product-category/reducer';

export const findAndToggleCategory = (id: string, categories: ProductCategoryDTO[]): ProductCategoryDTO[] => {
  const toggledCategories = [...categories];
  categories.forEach(category => {
    if (category._id === id) {
      category.isSelected = !!!category.isSelected;
    } else {
      findAndToggleCategory(id, category.children);
    }
  });

  return toggledCategories;
};
