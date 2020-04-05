import { IProductCategory } from '@shared/models/product-category';

export type ProductCategoryNode = {
  isSelected: boolean;
  subCategories: ProductCategoryNode[];
} & IProductCategory;
