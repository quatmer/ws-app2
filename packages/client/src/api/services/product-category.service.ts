import { ProductCategoryNode } from '../dto/product-category.dto';
import { IProductCategory } from '@shared/models/product-category';

const getCategoryTree = (categories: IProductCategory[]): ProductCategoryNode[] => {
  let categoryList: ProductCategoryNode[] = categories.map(c => {
    return { ...c, isSelected: false, subCategories: [] };
  });

  let catIds = categoryList.map(x => x.parentId);
  let uniqueCatParentIds = Array.from(new Set(catIds)); //unique category ids
  const groups: { parentId: string | null; subCategories: ProductCategoryNode[] }[] = [];

  uniqueCatParentIds.forEach(id => {
    const children: ProductCategoryNode[] = categoryList.filter(c => c.parentId === id);
    groups.push({ parentId: id, subCategories: children });
  });

  groups.forEach(g => {
    const category = categoryList.find(c => c._id === g.parentId);
    if (category) {
      category.subCategories = [...g.subCategories];
    }
  });

  categoryList = categoryList.filter(c => !c.parentId);

  return categoryList;
};

const findAndToggleCategory = (id: string, categories: ProductCategoryNode[]): ProductCategoryNode[] => {
  const toggleCategories = [...categories];
  toggleCategories.forEach(category => {
    if (category._id === id) {
      toggleCategories.filter(c => c._id !== id).forEach(c => (c.isSelected = false));
      category = { ...category, isSelected: !category.isSelected };
    } else {
      findAndToggleCategory(id, category.subCategories);
    }
  });
  return toggleCategories;
};

const ProductCategoryServices = {
  getCategoryTree,
  findAndToggleCategory,
};

export default ProductCategoryServices;
