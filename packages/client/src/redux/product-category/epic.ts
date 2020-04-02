import { Epic } from 'redux-observable';
import { isOfType, action } from 'typesafe-actions';
import { filter, switchMap, tap, ignoreElements } from 'rxjs/operators';
import Axios from 'axios';
import { ProductCategoryActionType, ProductCategoryActions } from './action';
import { IProductCategory } from '../../../../shared/models/product-category';
import { async } from 'rxjs/internal/scheduler/async';

const createProductCategory: Epic = action$ =>
  action$.pipe(
    filter(isOfType(ProductCategoryActionType.CREATE)),
    switchMap(async action => {
      const { name, productCategory } = action.payload;
      try {
        //create productCategory
      } catch (error) {
        return ProductCategoryActions.createError(error.message);
      }
    }),
  );

const updateProductCategory: Epic = action$ =>
  action$.pipe(
    filter(isOfType(ProductCategoryActionType.UPDATE)),
    switchMap(async action => {
      const { _id, name, productCategory } = action.payload;
      try {
        //update productCategory
      } catch (error) {
        return ProductCategoryActions.updateError(error.message);
      }
    }),
  );

const deleteProductCategory: Epic = action$ =>
  action$.pipe(
    filter(isOfType(ProductCategoryActionType.DELETE)),
    switchMap(async action => {
      const { _id } = action.payload;
      try {
        //delete productCategory
      } catch (error) {
        return ProductCategoryActions.deleteError(error.message);
      }
    }),
  );

export const productCategoryEpics = [createProductCategory, updateProductCategory, deleteProductCategory];
