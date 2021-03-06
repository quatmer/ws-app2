import { brandReducer } from './product-brand/reducer';
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { productCategoryReducer } from './product-category/reducer';
import { productCategoryEpics } from './product-category/epic';
import { productReducer } from './product/reducer';

export const rootEpic = combineEpics(...productCategoryEpics);

export const rootReducer = combineReducers({
  authState: authReducer,
  productState: productReducer,
  productCategoryState: productCategoryReducer,
  productBrandState: brandReducer,
});
