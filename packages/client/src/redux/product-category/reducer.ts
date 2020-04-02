import { IProductCategory } from '../../../../shared/models/product-category';
import { Reducer } from 'typesafe-actions';
import { ProductCategoryActionType, ProductCategoryFuncType } from './action';

export type ProductCategoryStateType = {
  loading: boolean;
  categories: IProductCategory[];
  error: string | null;
};

const initialState: ProductCategoryStateType = {
  loading: false,
  categories: [],
  error: null,
};

export const productCategoryReducer: Reducer<ProductCategoryStateType, ProductCategoryFuncType> = (
  state = initialState,
  action,
): ProductCategoryStateType => {
  switch (action.type) {
    case ProductCategoryActionType.CREATE_UPDATE: {
        return { ...state, loading: true, error: null };
    }
    case ProductCategoryActionType.CREATE_UPDATE_SUCCESS: {
      const { category} = action.payload;
      return { ...state, loading: false, productCategory: category, error: null };
    }
    case ProductCategoryActionType.CREATE_UPDATE_ERROR: {
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
