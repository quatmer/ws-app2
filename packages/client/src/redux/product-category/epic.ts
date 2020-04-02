import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, switchMap } from 'rxjs/operators';
import { ProductCategoryActionType, ProductCategoryActions, ProductCategoryFuncType } from './action';
import Axios from 'axios';
import { IProductCategory } from '../../../../shared/models/product-category';

const createUpdate: Epic<ProductCategoryFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(ProductCategoryActionType.CREATE_UPDATE)),
    switchMap(async action => {
      const { category } = action.payload;
      const refId = category._id;
      delete category._id;

      const response = await Axios.post<{ category: IProductCategory; hasError: boolean; message: string }>(
        '/product-category',
        { category },
      );

      try {
        if (response.data.hasError) {
          throw response.data.message;
        } else {
          return ProductCategoryActions.createUpdateSuccess(response.data.category, refId);
        }
      } catch (error) {
        return ProductCategoryActions.createUpdateError(error.message, category, refId);
      }
    }),
  );

export const productCategoryEpics = [createUpdate];
