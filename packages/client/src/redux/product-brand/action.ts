import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { IBrand } from '@shared/models/product-brand';

export enum ProductBrandActionType {
  ADD = '[brand]: ADD',
  UPDATE = '[brand]: UPDATE',
  DELETE = '[brand]: DELETE',
  SET_LIST = '[brand]: SET_LIST',
}

export const BrandActions = {
  add: (brand: IBrand) => action(ProductBrandActionType.ADD, { brand }),
  update: (brand: IBrand) => action(ProductBrandActionType.UPDATE, { brand }),
  delete: (id: string) => action(ProductBrandActionType.DELETE, { id }),
  setList: (brands: IBrand[]) => action(ProductBrandActionType.SET_LIST, { brands }),
};

export type ProductBrandFuncType = ActionsUnion<typeof BrandActions>;
