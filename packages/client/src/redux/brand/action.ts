import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { IBrand } from '@shared/models/brand';

export enum BrandActionType {
  ADD = '[brand]: ADD',
  UPDATE = '[brand]: UPDATE',
  DELETE = '[brand]: DELETE',
  SET_LIST = '[brand]: SET_LIST',
}

export const BrandActions = {
  add: (brand: IBrand) => action(BrandActionType.ADD, { brand }),
  update: (brand: IBrand) => action(BrandActionType.UPDATE, { brand }),
  delete: (id: string) => action(BrandActionType.DELETE, { id }),
  setList: (brands: IBrand[]) => action(BrandActionType.SET_LIST, { brands }),
};

export type BrandFuncType = ActionsUnion<typeof BrandActions>;
