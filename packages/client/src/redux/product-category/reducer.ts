import { Reducer } from 'typesafe-actions';
import { ProductCategoryActionType, ProductCategoryFuncType } from './action';
import { IProductCategory } from '@shared/models/product-category';
import ProductCategoryUtil from '../utils/product-category';

export type ProductCategoryDTO = IProductCategory & { isSelected?: boolean };

export type ProductCategoryStateType = {
  loading: boolean;
  categories: ProductCategoryDTO[];
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
    case ProductCategoryActionType.CREATE: {
      const { category } = action.payload;
      const categories = [...state.categories];
      categories.push(category);
      return { ...state, categories: [...categories], loading: true, error: null };
    }
    case ProductCategoryActionType.CREATE_SUCCESS: {
      const { category, refId } = action.payload;
      const categories = [...state.categories];

      const newCatIndex = categories.findIndex(c => c._id === refId);
      if (newCatIndex > -1) {
        categories[newCatIndex] = category;
      }
      return { ...state, categories: [...categories], loading: false, error: null };
    }
    case ProductCategoryActionType.CREATE_ERROR: {
      const { message, refId } = action.payload;
      let categories = [...state.categories];
      categories = categories.filter(c => c._id !== refId);
      return { ...state, loading: false, categories: [...categories], error: message };
    }

    case ProductCategoryActionType.UPDATE: {
      const { category } = action.payload;
      const categories = [...state.categories];
      const index = categories.findIndex(c => c._id === category._id);
      if (index !== -1) {
        categories[index] = category;
      }
      return { ...state, categories: [...categories], loading: true, error: null };
    }
    case ProductCategoryActionType.UPDATE_SUCCESS: {
      const { category } = action.payload;
      const categories = [...state.categories];
      const index = categories.findIndex(c => c._id === category._id);
      if (index !== -1) {
        categories[index] = category;
      }

      return { ...state, categories: [...categories], loading: false, error: null };
    }
    case ProductCategoryActionType.UPDATE_ERROR: {
      const { message, category } = action.payload;
      let categories = [...state.categories];

      const index = categories.findIndex(c => c._id === category._id);
      if (index !== -1) {
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

    case ProductCategoryActionType.TOGGLE_SELECT: {
      const { id } = action.payload;
      const categories = [...ProductCategoryUtil.findAndToggleCategory(id, state.categories)];

      return { ...state, categories };
    }
    default:
      return { ...state };
  }
};
