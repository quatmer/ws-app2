import { IBrand } from './../../../../shared/models/brand';
import { Reducer } from 'typesafe-actions';
import { BrandActionType, BrandFuncType } from './action';

export type BrandStateType = {
  brands: IBrand[];
};

const initialState: BrandStateType = {
  brands: [],
};

export const brandReducer: Reducer<BrandStateType, BrandFuncType> = (state = initialState, action): BrandStateType => {
  switch (action.type) {
    case BrandActionType.ADD: {
      const { brand } = action.payload;
      const brands = [...state.brands];
      brands.push(brand);
      return { ...state, brands };
    }

    case BrandActionType.UPDATE: {
      // TO DO bagindan koparmaya gerek var mi ?
      const { brand } = action.payload;
      var upt = state.brands.find(x => x._id === brand._id);
      if (upt) upt.name = brand.name;
      return { ...state };
    }

    case BrandActionType.DELETE: {
      const { id } = action.payload;
      let brands = [...state.brands];
      const index = brands.findIndex(c => c._id === id);
      brands.splice(index, 1);
      return { ...state, brands };
    }

    case BrandActionType.SET_LIST: {
      const { brands } = action.payload;
      return { ...state, brands };
    }

    default:
      return { ...state };
  }
};
