import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { IProductCategory } from '../../../../shared/models/product-category';

export enum ProductCategoryActionType {
  CREATE = '[product-category]: CREATE',
  CREATE_SUCCESS = '[product-category]: CREATE_SUCCESS',
  CREATE_ERROR = '[product-category]: CREATE_ERROR',
  UPDATE = '[product-category]: UPDATE',
  UPDATE_SUCCESS = '[product-category]: UPDATE_SUCCESS',
  UPDATE_ERROR = '[product-category]: UPDATE_ERROR',
  DELETE = '[product-category]: DELETE',
  DELETE_SUCCESS = '[product-category]: DELETE_SUCCESS',
  DELETE_ERROR = '[product-category]: DELETE_ERROR',
}

export const ProductCategoryActions = {
  create: (name: string, categoryTree: IProductCategory) => action(ProductCategoryActionType.CREATE, { name }),
  createSuccess: (productCategory: IProductCategory) =>
    action(ProductCategoryActionType.CREATE_SUCCESS, { productCategory }),
  createError: (message: string) => action(ProductCategoryActionType.CREATE_ERROR, { message }),

  update: (name: string, categoryTree: IProductCategory) => action(ProductCategoryActionType.UPDATE, { name }),
  updateSuccess: (productCategory: IProductCategory) =>
    action(ProductCategoryActionType.UPDATE_SUCCESS, { productCategory }),
  updateError: (message: string) => action(ProductCategoryActionType.UPDATE_ERROR, { message }),

  delete: (id: string) => action(ProductCategoryActionType.DELETE, { id }),
  deleteSuccess: (message: string) => action(ProductCategoryActionType.DELETE_SUCCESS, { message }),
  deleteError: (message: string) => action(ProductCategoryActionType.DELETE_ERROR, { message }),
};

export type ProductCategoryFuncType = ActionsUnion<typeof ProductCategoryActions>;
