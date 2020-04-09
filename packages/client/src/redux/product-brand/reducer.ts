import { Reducer } from 'typesafe-actions';
import { IProductBrand } from '@shared/models/product-brand';
import { ProductBrandFuncType, ProductBrandActionType } from './action';

export type ProductBrandStateType = {
  loading: boolean;
  brands: IProductBrand[];
  error: string | null;
};

const initialState: ProductBrandStateType = {
  loading: false,
  brands: [],
  error: null,
};

export const productBrandReducer: Reducer<ProductBrandStateType, ProductBrandFuncType> = (
  state = initialState,
  action,
): ProductBrandStateType => {
  switch (action.type) {
    case ProductBrandActionType.CREATE: {
      const { brand } = action.payload;
      const brands = [...state.brands];
      brands.push(brand);

      return { ...state, brands, loading: true, error: null };
    }
    case ProductBrandActionType.CREATE_SUCCESS: {
      const { brand, refId } = action.payload;
      const brands = [...state.brands];

      const newBrandIndex = brands.findIndex(b => b._id === refId);
      if (newBrandIndex > -1) {
        brands[newBrandIndex] = brand;
      }
      return { ...state, brands, loading: false, error: null };
    }
    case ProductBrandActionType.CREATE_ERROR: {
      const { message, refId } = action.payload;
      let brands = [...state.brands];
      brands = brands.filter(b => b._id !== refId);
      return { ...state, loading: false, brands, error: message };
    }

    case ProductBrandActionType.UPDATE: {
      const { brand } = action.payload;
      const brands = [...state.brands];
      const index = brands.findIndex(b => b._id === brand._id);
      if (index !== -1) {
        brands[index] = brand;
      }
      return { ...state, brands, loading: false, error: null };
    }
    case ProductBrandActionType.UPDATE_SUCCESS: {
      const { brand } = action.payload;
      const brands = [...state.brands];
      const index = brands.findIndex(b => b._id === brand._id);
      if (index !== -1) {
        brands[index] = brand;
      }
      return { ...state, brands, loading: false, error: null };
    }
    case ProductBrandActionType.UPDATE_ERROR: {
      const { brand } = action.payload;
      let brands = [...state.brands];
      const index = brands.findIndex(b => b._id === brand._id);
      if (index !== -1) {
        brands[index] = brand;
      }
      return { ...state, loading: false, brands, error: null };
    }

    case ProductBrandActionType.DELETE: {
      return { ...state, loading: true, error: null };
    }
    case ProductBrandActionType.DELETE_SUCCESS: {
      const { id } = action.payload;
      let brands = [...state.brands];
      const index = brands.findIndex(b => b._id === id);
      if (index !== -1) {
        brands.splice(index, 1);
      }
      return { ...state, loading: false, error: null, brands };
    }
    case ProductBrandActionType.DELETE_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, error: message };
    }

    case ProductBrandActionType.GET_LIST: {
      return { ...state, loading: true, error: null };
    }
    case ProductBrandActionType.GET_LIST_SUCCESS: {
      const { brands } = action.payload;
      return { ...state, brands, loading: false, error: null };
    }
    case ProductBrandActionType.GET_LIST_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, error: message };
    }

    default:
      return { ...state };
  }
};
