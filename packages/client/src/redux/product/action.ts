import { ActionsUnion } from './../helper/type.helper';
import { IProduct } from './../../../../shared/models/product';
import { action } from 'typesafe-actions';

export enum ProductActionType {
  ADD = '[product]: ADD',
  UPDATE = '[product]: UPDATE',
  DELETE = '[product]: DELETE',
  LIST = '[product]: LIST',
}

export const ProductActions = {
  add: (product: IProduct) => action(ProductActionType.ADD, { product }),
  update: (product: IProduct) => action(ProductActionType.UPDATE, { product }),
  delete: (id: string) => action(ProductActionType.DELETE, { id }),
  list: (products: IProduct[]) => action(ProductActionType.LIST, { products }),
};

export type ProductFuncType = ActionsUnion<typeof ProductActions>;
