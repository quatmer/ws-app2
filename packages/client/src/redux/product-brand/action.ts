import { action } from 'typesafe-actions';
import { IProductBrand } from '@shared/models/product-brand';
import { ActionsUnion } from '../helper/type.helper';

export enum ProductBrandActionType {
  CREATE = '[product brand]: CREATE',
  CREATE_SUCCESS = '[product brand]: CREATE_SUCCESS',
  CREATE_ERROR = '[product brand]: CREATE_ERROR',
  UPDATE = '[product brand]: UPDATE',
  UPDATE_SUCCESS = '[product brand]: UPDATE_SUCCESS',
  UPDATE_ERROR = '[product brand]: UPDATE_ERROR',
  DELETE = '[product brand]: DELETE',
  DELETE_SUCCESS = '[product DELETE_SUCCESS',
  DELETE_ERROR = '[product brand]: DELETE_ERROR',
  GET_LIST = '[product brand]: GET_LIST',
  GET_LIST_SUCCESS = '[product GET_LIST_SUCCESS',
  GET_LIST_ERROR = '[product brand]: GET_LIST_ERROR',
}

export const ProductBrandActions = {
  create: (brand: IProductBrand) => action(ProductBrandActionType.CREATE, { brand }),
  createSuccess: (brand: IProductBrand, refId: string) =>
    action(ProductBrandActionType.CREATE_SUCCESS, { brand, refId }),
  createError: (message: string, refId: string) => action(ProductBrandActionType.CREATE_ERROR, { message, refId }),

  update: (brand: IProductBrand) => action(ProductBrandActionType.UPDATE, { brand }),
  updateSuccess: (brand: IProductBrand) => action(ProductBrandActionType.UPDATE_SUCCESS, { brand }),
  updateError: (message: string, brand: IProductBrand) =>
    action(ProductBrandActionType.UPDATE_ERROR, { message, brand }),

  delete: (id: string) => action(ProductBrandActionType.DELETE, { id }),
  deleteSuccess: (id: string) => action(ProductBrandActionType.DELETE_SUCCESS, { id }),
  deleteError: (message: string) => action(ProductBrandActionType.DELETE_ERROR, { message }),

  getList: () => action(ProductBrandActionType.GET_LIST),
  getListSuccess: (brands: IProductBrand[]) => action(ProductBrandActionType.GET_LIST_SUCCESS, { brands }),
  getListError: (message: string) => action(ProductBrandActionType.GET_LIST_ERROR, { message }),
};

export type ProductBrandFuncType = ActionsUnion<typeof ProductBrandActions>;
