import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { IBrand } from '@shared/models/brand';

export enum BrandActionType {
  CREATE = '[brand]: CREATE',
  CREATE_SUCCESS = '[brand]: CREATE_SUCCESS',
  CREATE_ERROR = '[brand]: CREATE_ERROR',
  UPDATE = '[brand]: UPDATE',
  UPDATE_SUCCESS = '[brand]: UPDATE_SUCCESS',
  UPDATE_ERROR = '[brand]: UPDATE_ERROR',
  DELETE = '[brand]: DELETE',
  DELETE_SUCCESS = '[brand]: DELETE_SUCCESS',
  DELETE_ERROR = '[brand]: DELETE_ERROR',
  GET_LIST = '[brand]: GET_LIST',
  GET_LIST_SUCCESS = '[brand]: GET_LIST_SUCCESS',
  GET_LIST_ERROR = '[brand]: GET_LIST_ERROR',
  // DELAYED = '[brand]: DELAYED',
  CLEAR_ERROR = '[brand]: CLEAR_ERROR',
}

export const BrandActions = {
  create: (refId: string, brand: string) => action(BrandActionType.CREATE, { refId, brand }),
  createSuccess: (messageId: string, brand: IBrand) => action(BrandActionType.CREATE_SUCCESS, { messageId, brand }),
  createError: (messageId: string, message: string) => action(BrandActionType.CREATE_ERROR, { messageId, message }),

  update: (brand: IBrand) => action(BrandActionType.UPDATE, { brand }),
  updateSuccess: (messageId: string, brand: IBrand) => action(BrandActionType.UPDATE_SUCCESS, { messageId, brand }),
  updateError: (messageId: string, message: string) => action(BrandActionType.UPDATE_ERROR, { messageId, message }),

  delete: (id: string) => action(BrandActionType.DELETE, { id }),
  deleteSuccess: (id: string) => action(BrandActionType.DELETE_SUCCESS, { id }),
  deleteError: (message: string) => action(BrandActionType.DELETE_ERROR, { message }),

  getList: () => action(BrandActionType.GET_LIST),
  getListSuccess: (brands: IBrand[]) => action(BrandActionType.GET_LIST_SUCCESS, { brands }),
  getListError: (message: string) => action(BrandActionType.GET_LIST_ERROR, { message }),

  // delayed: () => action(BrandActionType.DELAYED, {}),
  clearError: () => action(BrandActionType.CLEAR_ERROR, {}),
};

export type BrandFuncType = ActionsUnion<typeof BrandActions>;
