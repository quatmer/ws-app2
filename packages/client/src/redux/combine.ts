import { appReducer } from './app/reducer';
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { authEpics } from './auth/epic';
import { productCategoryReducer } from './product-category/reducer';
import { productCategoryEpics } from './product-category/epic';
import { productBrandReducer } from './product-brand/reducer';
import { productBrandEpics } from './product-brand/epic';

export const rootEpic = combineEpics(...authEpics, ...productCategoryEpics, ...productBrandEpics);

export const rootReducer = combineReducers({
  authState: authReducer,
  appState: appReducer,
  productCategoryState: productCategoryReducer,
  productBrandState: productBrandReducer,
});
