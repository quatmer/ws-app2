import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { authEpics } from './auth/epic';
import { productCategoryReducer } from './product-category/reducer';
import { productCategoryEpics } from './product-category/epic';

export const rootEpic = combineEpics(...authEpics, ...productCategoryEpics);

export const rootReducer = combineReducers({
  authState: authReducer,
  productCategoryState: productCategoryReducer,
});
