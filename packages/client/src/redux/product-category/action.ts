import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { IProductCategory } from '@shared/models/product-category';

export enum ProductCategoryActionType {
  CREATE_UPDATE = '[product category]: CREATE_UPDATE',
  CREATE_UPDATE_SUCCESS = '[product category]: CREATE_UPDATE_SUCCESS',
  CREATE_UPDATE_ERROR = '[product category]: CREATE_UPDATE_ERROR',
  DELETE = '[product category]: DELETE',
  DELETE_SUCCESS = '[product category]: DELETE_SUCCESS',
  DELETE_ERROR = '[product category]: DELETE_ERROR',
  GET_LIST = '[product category]: GET_LIST',
  GET_LIST_SUCCESS = '[product category]: GET_LIST_SUCCESS',
  GET_LIST_ERROR = '[product category]: GET_LIST_ERROR',
  TOGGLE_SELECT = '[product category]: TOGGLE_SELECT',
}

export const ProductCategoryActions = {
  createUpdate: (category: IProductCategory) => action(ProductCategoryActionType.CREATE_UPDATE, { category }),
  createUpdateSuccess: (category: IProductCategory, refId: string) =>
    action(ProductCategoryActionType.CREATE_UPDATE_SUCCESS, { category, refId }),
  createUpdateError: (message: string, category: IProductCategory, refId: string) =>
    action(ProductCategoryActionType.CREATE_UPDATE_ERROR, { message, category, refId }),

  delete: (id: string) => action(ProductCategoryActionType.DELETE, { id }),
  deleteSuccess: (id: string) => action(ProductCategoryActionType.DELETE_SUCCESS, { id }),
  deleteError: (message: string) => action(ProductCategoryActionType.DELETE_ERROR, { message }),

  getList: () => action(ProductCategoryActionType.GET_LIST),
  getListSuccess: (categories: IProductCategory[]) =>
    action(ProductCategoryActionType.GET_LIST_SUCCESS, { categories }),
  getListError: (message: string) => action(ProductCategoryActionType.GET_LIST_ERROR, { message }),

  toggleSelect: (id: string) => action(ProductCategoryActionType.TOGGLE_SELECT, { id }),
};

export type ProductCategoryFuncType = ActionsUnion<typeof ProductCategoryActions>;
