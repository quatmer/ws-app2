import { IBrand } from './../../../../shared/models/brand';
import { Reducer } from 'typesafe-actions';
import { BrandActionType, BrandFuncType } from './action';

export type BrandStateType = {
  loading: boolean;
  // delayed: boolean;
  brands: IBrand[];
  error: string | null;
  messageId: string | null;
};

const initialState: BrandStateType = {
  loading: false,
  // delayed: false,
  brands: [],
  error: null,
  messageId: null,
};

export const brandReducer: Reducer<BrandStateType, BrandFuncType> = (state = initialState, action): BrandStateType => {
  switch (action.type) {
    case BrandActionType.CREATE: {
      console.log('[brand-reducer] BrandActionType.CREATE');
      return { ...state, loading: true, messageId: null, error: null };
    }
    // case BrandActionType.DELAYED:
    //   return { ...state, delayed: true };

    case BrandActionType.CLEAR_ERROR:
      return { ...state, error: null };

    case BrandActionType.CREATE_SUCCESS: {
      console.log('[brand-reducer] BrandActionType.CREATE_SUCCESS');
      const { messageId, brand } = action.payload;
      const brands = [...state.brands];
      brands.push(brand);
      return { ...state, brands, loading: false, messageId, error: null };
    }

    case BrandActionType.CREATE_ERROR: {
      console.log('[brand-reducer] BrandActionType.CREATE_ERROR');
      const { messageId, message } = action.payload;
      return { ...state, loading: false, messageId, error: message };
    }

    case BrandActionType.UPDATE: {
      return { ...state, loading: true, messageId: null, error: null };
    }
    case BrandActionType.UPDATE_SUCCESS: {
      // TO DO bagindan koparmaya gerek var mi ?
      const { messageId, brand } = action.payload;
      var upt = state.brands.find(x => x._id === brand._id);
      if (upt) upt.name = brand.name;
      return { ...state, loading: false, messageId, error: null };
    }
    case BrandActionType.UPDATE_ERROR: {
      const { messageId, message } = action.payload;

      return { ...state, loading: false, messageId, error: message };
    }

    case BrandActionType.DELETE: {
      return { ...state, loading: true, error: null };
    }
    case BrandActionType.DELETE_SUCCESS: {
      const { id } = action.payload;
      let brands = [...state.brands];
      const index = brands.findIndex(c => c._id === id);
      brands.splice(index, 1);

      return { ...state, loading: false, brands, error: null };
    }
    case BrandActionType.DELETE_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, error: message };
    }
    case BrandActionType.GET_LIST: {
      return { ...state, loading: true, error: null };
    }
    case BrandActionType.GET_LIST_SUCCESS: {
      const { brands } = action.payload;
      return { ...state, loading: false, brands, error: null };
    }
    case BrandActionType.GET_LIST_ERROR: {
      const { message } = action.payload;
      return { ...state, loading: false, error: message };
    }
    default:
      return { ...state };
  }
};
