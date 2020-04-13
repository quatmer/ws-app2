import { Reducer } from 'typesafe-actions';
import { ProductBrandActionType, ProductBrandFuncType } from './action';
import { IProductBrand } from '@shared/models/product-brand';

export type ProductBrandStateType = {
  brands: IProductBrand[];
};

const initialState: ProductBrandStateType = {
  brands: [],
};

export const brandReducer: Reducer<ProductBrandStateType, ProductBrandFuncType> = (
  state = initialState,
  action,
): ProductBrandStateType => {
  switch (action.type) {
    case ProductBrandActionType.ADD: {
      const { brand } = action.payload;
      const brands = [...state.brands];
      brands.push(brand);
      return { ...state, brands };
    }

    case ProductBrandActionType.UPDATE: {
      // TO DO bagindan koparmaya gerek var mi ?
      const { brand } = action.payload;
      var upt = state.brands.find(x => x._id === brand._id);
      if (upt) upt.name = brand.name;
      return { ...state };
    }

    case ProductBrandActionType.DELETE: {
      const { id } = action.payload;
      let brands = [...state.brands];
      const index = brands.findIndex(c => c._id === id);
      brands.splice(index, 1);
      return { ...state, brands };
    }

    case ProductBrandActionType.SET_LIST: {
      const { brands } = action.payload;
      return { ...state, brands };
    }

    default:
      return { ...state };
  }
};
