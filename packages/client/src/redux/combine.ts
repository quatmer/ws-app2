import { brandReducer } from './product-brand/reducer';
import { appReducer } from './app/reducer';
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { productCategoryReducer } from './product-category/reducer';
import { productCategoryEpics } from './product-category/epic';

export const rootEpic = combineEpics(...productCategoryEpics);

export const rootReducer = combineReducers({
  authState: authReducer,
  appState: appReducer,
  productCategoryState: productCategoryReducer,
  productBrandState: brandReducer,
});
