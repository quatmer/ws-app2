import { ProductCategoryEntity } from '../entities/product-category.entity';

export const ProductCategoryService = {
  increaseProductCount: async (categoryIds: string[]) => {
    try {
      const response = await ProductCategoryEntity.updateMany(
        { _id: { $in: categoryIds } },
        { $inc: { productCount: 1 } },
      );
      console.log('RESPONSE on product Entity :', response);
    } catch (error) {
      console.log('ERROR ON Product Entity :', error);
    }
  },
};
