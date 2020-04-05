import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { IProductCategory } from '@shared/models/product-category';

export enum ProductCategoryActionType {
  CREATE = '[product category]: CREATE',
  CREATE_SUCCESS = '[product category]: CREATE_SUCCESS',
  CREATE_ERROR = '[product category]: CREATE_ERROR',
  UPDATE = '[product category]: UPDATE',
  UPDATE_SUCCESS = '[product category]: UPDATE_SUCCESS',
  UPDATE_ERROR = '[product category]: UPDATE_ERROR',
  DELETE = '[product category]: DELETE',
  DELETE_SUCCESS = '[product category]: DELETE_SUCCESS',
  DELETE_ERROR = '[product category]: DELETE_ERROR',
  GET_LIST = '[product category]: GET_LIST',
  GET_LIST_SUCCESS = '[product category]: GET_LIST_SUCCESS',
  GET_LIST_ERROR = '[product category]: GET_LIST_ERROR',
  TOGGLE_SELECT = '[product category]: TOGGLE_SELECT',
}

export const ProductCategoryActions = {
  create: (category: IProductCategory) => action(ProductCategoryActionType.CREATE, { category }),
  createSuccess: (category: IProductCategory, refId: string) =>
    action(ProductCategoryActionType.CREATE_SUCCESS, { category, refId }),
  createError: (message: string, refId: string) => action(ProductCategoryActionType.CREATE_ERROR, { message, refId }),

  update: (category: IProductCategory) => action(ProductCategoryActionType.UPDATE, { category }),
  updateSuccess: (category: IProductCategory) => action(ProductCategoryActionType.UPDATE_SUCCESS, { category }),
  updateError: (message: string, category: IProductCategory) =>
    action(ProductCategoryActionType.UPDATE_ERROR, { message, category }),

  delete: (id: string) => action(ProductCategoryActionType.DELETE, { id }),
  deleteSuccess: (id: string) => action(ProductCategoryActionType.DELETE_SUCCESS, { id }),
  deleteError: (message: string) => action(ProductCategoryActionType.DELETE_ERROR, { message }),

  getList: () => action(ProductCategoryActionType.GET_LIST),
  getListSuccess: (categories: IProductCategory[]) =>
    action(ProductCategoryActionType.GET_LIST_SUCCESS, { categories }),
  getListError: (message: string) => action(ProductCategoryActionType.GET_LIST_ERROR, { message }),
};

export type ProductCategoryFuncType = ActionsUnion<typeof ProductCategoryActions>;
