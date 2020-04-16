import { Reducer } from 'typesafe-actions';
import { ProductActionType, ProductFuncType } from './action';
import { IProduct } from './../../../../shared/models/product';

export type ProductStateType = {
  products: IProduct[];
};

const initialState: ProductStateType = {
  products: [],
};

export const productReducer: Reducer<ProductStateType, ProductFuncType> = (
  state = initialState,
  action,
): ProductStateType => {
  switch (action.type) {
    case ProductActionType.ADD: {
      const { product } = action.payload;
      const products = [...state.products];
      products.push(product);
      return { ...state, products };
    }

    case ProductActionType.UPDATE: {
      const { product } = action.payload;
      const products = [...state.products];
      const idx = products.findIndex(p => p._id === product._id);
      if (idx !== -1) {
        products[idx] = product;
      }
      return { ...state, products };
    }

    case ProductActionType.DELETE: {
      const { id } = action.payload;
      const products = [...state.products];
      let idx = products.findIndex(p => p._id === id);
      if (idx !== -1) {
        products.splice(idx, 1);
      }
      return { ...state, products };
    }

    case ProductActionType.LIST: {
      const { products } = action.payload;
      return { ...state, products };
    }

    default:
      return { ...state };
  }
};
