import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, switchMap } from 'rxjs/operators';
import { ProductCategoryActionType, ProductCategoryActions, ProductCategoryFuncType } from './action';
import Axios from 'axios';
import { IProductCategory } from '@shared/models/product-category';
import ProductCategoryUtil from '../utils/product-category';

const create: Epic<ProductCategoryFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(ProductCategoryActionType.CREATE)),
    switchMap(async action => {
      const category = { ...action.payload.category };
      const refId = action.payload.refId;
      delete category._id;

      const response = await Axios.post<{ category: IProductCategory; hasError: boolean; message: string }>(
        '/product-category',
        { category },
      );

      try {
        if (response.data.hasError) {
          throw response.data.message;
        } else {
          return ProductCategoryActions.createSuccess(response.data.category, refId);
        }
      } catch (error) {
        return ProductCategoryActions.createError(error.message, refId);
      }
    }),
  );

const update: Epic<ProductCategoryFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(ProductCategoryActionType.UPDATE)),
    switchMap(async action => {
      const category = { ...action.payload.category };
      ProductCategoryUtil.deleteEmptyIds(category);

      const response = await Axios.post<{ category: IProductCategory; hasError: boolean; message: string }>(
        '/product-category',
        { category },
      );

      try {
        if (response.data.hasError) {
          throw response.data.message;
        } else {
          return ProductCategoryActions.updateSuccess(response.data.category);
        }
      } catch (error) {
        return ProductCategoryActions.updateError(error.message, category);
      }
    }),
  );

const deleteCategory: Epic<ProductCategoryFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(ProductCategoryActionType.DELETE)),
    switchMap(async action => {
      const { id } = action.payload;

      const response = await Axios.delete<{ category: IProductCategory; hasError: boolean; message: string }>(
        '/product-category/' + id,
      );

      try {
        if (response.data.hasError) {
          throw response.data.message;
        } else {
          return ProductCategoryActions.deleteSuccess(id);
        }
      } catch (error) {
        return ProductCategoryActions.deleteError(error.message);
      }
    }),
  );

const getList: Epic<ProductCategoryFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(ProductCategoryActionType.GET_LIST)),
    switchMap(async action => {
      const response = await Axios.get<{ categories: IProductCategory[]; hasError: boolean; message: string }>(
        '/product-category',
        {},
      );

      try {
        if (response.data.hasError) {
          throw response.data.message;
        } else {
          return ProductCategoryActions.getListSuccess(response.data.categories);
        }
      } catch (error) {
        return ProductCategoryActions.getListError(error.message);
      }
    }),
  );

export const productCategoryEpics = [create, update, deleteCategory, getList];
