import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, switchMap } from 'rxjs/operators';
import { ProductCategoryActionType, ProductCategoryActions } from './action';

const createProductCategory: Epic = action$ =>
  action$.pipe(
    filter(isOfType(ProductCategoryActionType.CREATE)),
    switchMap(async action => {
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
      try {
        //delete productCategory
      } catch (error) {
        return ProductCategoryActions.deleteError(error.message);
      }
    }),
  );

export const productCategoryEpics = [createProductCategory, updateProductCategory, deleteProductCategory];
