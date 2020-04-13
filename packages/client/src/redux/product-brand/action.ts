import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { IProductBrand } from '@shared/models/product-brand';

export enum ProductBrandActionType {
  ADD = '[brand]: ADD',
  UPDATE = '[brand]: UPDATE',
  DELETE = '[brand]: DELETE',
  SET_LIST = '[brand]: SET_LIST',
}

export const BrandActions = {
  add: (brand: IProductBrand) => action(ProductBrandActionType.ADD, { brand }),
  update: (brand: IProductBrand) => action(ProductBrandActionType.UPDATE, { brand }),
  delete: (id: string) => action(ProductBrandActionType.DELETE, { id }),
  setList: (brands: IProductBrand[]) => action(ProductBrandActionType.SET_LIST, { brands }),
};

export type ProductBrandFuncType = ActionsUnion<typeof BrandActions>;
