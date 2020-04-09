import { Epic } from 'redux-observable';
import { ProductBrandFuncType, ProductBrandActionType, ProductBrandActions } from './action';
import { isOfType } from 'typesafe-actions';
import { filter, switchMap } from 'rxjs/operators';
import Axios from 'axios';
import { IProductBrand } from '@shared/models/product-brand';
import { IErrorResponse } from '@shared/models/error-response';

const createBrand: Epic<ProductBrandFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(ProductBrandActionType.CREATE)), //create action listening
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

const updateBrand: Epic<ProductBrandFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(ProductBrandActionType.UPDATE)),
    switchMap(async action => {
      const brand = { ...action.payload.brand };

      try {
        const response = await Axios.post<{ brand: IProductBrand } & IErrorResponse>('/product-brand/' + brand._id, {
          name: brand.name,
        });

        console.log(response);

        if (response.data.hasError) {
          throw response.data.message;
        } else {
          return ProductBrandActions.updateSuccess(response.data.brand);
        }
      } catch (error) {
        return ProductBrandActions.updateError(error.message, brand);
      }
    }),
  );

const deleteBrand: Epic<ProductBrandFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(ProductBrandActionType.DELETE)),
    switchMap(async action => {
      const { id } = action.payload;

      const response = await Axios.delete<IErrorResponse>('/product-brand/' + id);

      try {
        if (response.data.hasError) {
          throw response.data.message;
        } else {
          return ProductBrandActions.deleteSuccess(id);
        }
      } catch (error) {
        return ProductBrandActions.deleteError(error.message);
      }
    }),
  );

const getBrandList: Epic<ProductBrandFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(ProductBrandActionType.GET_LIST)), //create action listening
    switchMap(async action => {
      try {
        const response = await Axios.get<{ brands: IProductBrand[] } & IErrorResponse>('/product-brand');

        if (response.data.hasError) {
          throw response.data.message;
        } else {
          return ProductBrandActions.getListSuccess(response.data.brands);
        }
      } catch (error) {
        console.log(error.response);
        return ProductBrandActions.getListError(error.message);
      }
    }),
  );

export const productBrandEpics = [createBrand, updateBrand, deleteBrand, getBrandList];
