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
      state.products.push(product);
      return { ...state };
    }

    case ProductActionType.UPDATE: {
      const { product } = action.payload;
      let foundProduct = state.products.find(p => p._id === product._id);
      if (foundProduct) {
        foundProduct = product;
      }
      return { ...state };
    }

    case ProductActionType.DELETE: {
      const { id } = action.payload;
      let productIndex = state.products.findIndex(p => p._id === id);
      if (productIndex !== -1) {
        state.products.splice(productIndex, 1);
      }
      return { ...state };
    }

    case ProductActionType.LIST: {
      const { products } = action.payload;
      return { ...state, products };
    }

    default:
      return { ...state };
  }
};
