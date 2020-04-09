import { Epic } from 'redux-observable';
import { ProductBrandFuncType, ProductBrandActionType, ProductBrandActions } from './action';
import { isOfType } from 'typesafe-actions';
import { filter, switchMap } from 'rxjs/operators';
import Axios from 'axios';
import { IProductBrand } from '@shared/models/product-brand';
import { IErrorResponse } from '@shared/models/error-response';

const create: Epic<ProductBrandFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(ProductBrandActionType.CREATE)),
    switchMap(async action => {
      const brand = { ...action.payload.brand };
      const refId = brand._id;
      delete brand._id;

      try {
        const response = await Axios.post<{ brand: IProductBrand } & IErrorResponse>('/product-brand', {
          name: brand.name,
        });

        if (response.data.hasError) {
          throw response.data.message;
        } else {
          return ProductBrandActions.createSuccess(response.data.brand, refId);
        }
      } catch (error) {
        console.log(error.response);
        return ProductBrandActions.createError(error.message, refId);
      }
    }),
  );

export const productBrandEpics = [create];
