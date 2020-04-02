import { IProductCategory } from '../../../../shared/models/product-category';
import { Reducer } from 'typesafe-actions';
import { ProductCategoryActionType, ProductCategoryFuncType } from './action';

export type ProductCategoryStateType = {
  loading: boolean;
  productCategory: IProductCategory | null;
  error: string | null;
};

const initialState: ProductCategoryStateType = {
  loading: false,
  productCategory: null,
  error: null,
};

export const productCategoryReducer: Reducer<ProductCategoryStateType, ProductCategoryFuncType> = (
  state = initialState,
  action,
): ProductCategoryStateType => {
  switch (action.type) {
    case ProductCategoryActionType.CREATE: {
      return { ...state, loading: true, productCategory: null, error: null };
    }
    case ProductCategoryActionType.CREATE_SUCCESS: {
      const { productCategory } = action.payload;
      return { ...state, loading: false, productCategory: productCategory, error: null };
    }
    case ProductCategoryActionType.CREATE_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, productCategory: null, error: message };
    }
    case ProductCategoryActionType.UPDATE: {
      return { ...state, loading: true, productCategory: null, error: null };
    }
    case ProductCategoryActionType.UPDATE_SUCCESS: {
      const { productCategory } = action.payload;
      return { ...state, loading: false, productCategory: productCategory, error: null };
    }
    case ProductCategoryActionType.UPDATE_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, productCategory: null, error: message };
    }
    case ProductCategoryActionType.DELETE: {
      return { ...state, loading: true, productCategory: null, error: null };
    }
    case ProductCategoryActionType.DELETE_SUCCESS: {
      return { ...state, loading: false, productCategory: null, error: null };
    }
    case ProductCategoryActionType.DELETE_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, productCategory: null, error: message };
    }
    default:
      return { ...state };
  }
};
