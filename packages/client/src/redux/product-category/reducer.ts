import { Reducer } from 'typesafe-actions';
import { ProductCategoryActionType, ProductCategoryFuncType } from './action';
import { IProductCategory } from '@shared/models/product-category';

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
      const { category } = action.payload;
      const categories = [...state.categories];
      const index = categories.findIndex(c => c._id === category._id);
      if (index === -1) {
        categories.push(category);
      } else {
        categories[index] = category;
      }
      return { ...state, categories: [...categories], loading: true, error: null };
    }
    case ProductCategoryActionType.CREATE_UPDATE_SUCCESS: {
      const { category, refId } = action.payload;
      const categories = [...state.categories];
      const index = categories.findIndex(c => c._id === category._id);
      if (index === -1) {
        const newCatIndex = categories.findIndex(c => c._id === refId);
        if (newCatIndex > -1) {
          categories[newCatIndex] = category;
        }
      } else {
        categories[index] = category;
      }

      return { ...state, categories: [...categories], loading: false, error: null };
    }
    case ProductCategoryActionType.CREATE_UPDATE_ERROR: {
      const { message, category, refId } = action.payload;
      let categories = [...state.categories];
      if (!category._id) {
        categories = categories.filter(c => c._id !== refId);
      } else {
        const index = categories.findIndex(c => c._id === category._id);
        categories[index] = category;
      }
      return { ...state, loading: false, categories: [...categories], error: message };
    }
    case ProductCategoryActionType.DELETE: {
      return { ...state, loading: true, error: null };
    }
    case ProductCategoryActionType.DELETE_SUCCESS: {
      const { id } = action.payload;
      let categories = [...state.categories];
      const index = categories.findIndex(c => c._id === id);
      categories.splice(index, 1);

      return { ...state, loading: false, categories: [...categories], error: null };
    }
    case ProductCategoryActionType.DELETE_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, error: message };
    }
    case ProductCategoryActionType.GET_LIST: {
      return { ...state, loading: true, error: null };
    }
    case ProductCategoryActionType.GET_LIST_SUCCESS: {
      const { categories } = action.payload;
      return { ...state, loading: false, categories: [...categories], error: null };
    }
    case ProductCategoryActionType.GET_LIST_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, error: message };
    }
    default:
      return { ...state };
  }
};
