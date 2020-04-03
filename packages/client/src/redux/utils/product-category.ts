import { ProductCategoryDTO } from '../product-category/reducer';

export const findAndToggleCategory = (id: string, categories: ProductCategoryDTO[]): ProductCategoryDTO[] => {
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
