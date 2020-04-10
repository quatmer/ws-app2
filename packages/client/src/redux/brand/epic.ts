import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, switchMap } from 'rxjs/operators';
import { BrandActionType, BrandActions, BrandFuncType } from './action';
import Axios from 'axios';
import { IBrand } from '@shared/models/brand';
import { IErrorResponse } from '@shared/models/error-response';

const createBrand: Epic<BrandFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(BrandActionType.CREATE)),
    switchMap(async action => {
      const { refId, brand } = action.payload;

      // console.log('[brand-epic] BrandActionType.CREATE');

      try {
        const response = await Axios.post<{ brand: IBrand }>('/brand', {
          name: brand,
        });

        // console.log('[brand-epic] BrandActionType.CREATE => RESPONSE : ', JSON.stringify(response.data));
        return BrandActions.createSuccess(refId, response.data.brand);

        // if (response.data.hasError) {
        //   console.log('[brand-epic] BrandActionType.CREATE => ERROR Message : ', response.data.message);
        //   throw response.data.message;
        // } else {
        // }
      } catch (error) {
        // console.log('[brand-epic] BrandActionType.CREATE => ERROR => response : ', error.response);
        // console.log('[brand-epic] BrandActionType.CREATE => ERROR => message: ', error.message);
        // console.log('[brand-epic] BrandActionType.CREATE => ERROR => statusText: ', error.statusText);
        var errorMessage = error.response ? error.response.statusText : error.message;
        return BrandActions.createError(refId, errorMessage);
      }
    }),
  );

const updateBrand: Epic<BrandFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(BrandActionType.UPDATE)),
    switchMap(async action => {
      const brand = { ...action.payload.brand };

      try {
        const response = await Axios.post<{ brand: IBrand }>('/brand/' + brand._id, {
          name: brand.name,
        });

        return BrandActions.updateSuccess(brand._id, response.data.brand);
      } catch (error) {
        var errorMessage = error.response ? error.response.statusText : error.message;
        return BrandActions.updateError(brand._id, errorMessage);
      }
    }),
  );

const deleteBrand: Epic<BrandFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(BrandActionType.DELETE)),
    switchMap(async action => {
      const { id } = action.payload;

      //  console.log('[brand-epic] BrandActionType.DELETE');

      try {
        await Axios.delete<IErrorResponse>('/brand/' + id);

        // console.log('[brand-epic] BrandActionType.DELETE => RESPONSE : ', JSON.stringify(response.data));
        return BrandActions.deleteSuccess(id);
      } catch (error) {
        // console.log('[brand-epic] BrandActionType.DELETE => ERROR => response : ', error.response);
        // console.log('[brand-epic] BrandActionType.DELETE => ERROR => message: ', error.message);
        // console.log('[brand-epic] BrandActionType.DELETE => ERROR => statusText: ', error.statusText);
        var errorMessage = error.response ? error.response.statusText : error.message;
        return BrandActions.deleteError(errorMessage);
      }
    }),
  );

const getList: Epic<BrandFuncType> = action$ =>
  action$.pipe(
    filter(isOfType(BrandActionType.GET_LIST)),
    switchMap(async () => {
      try {
        const response = await Axios.get<{ brands: IBrand[] } & IErrorResponse>('/brand', {});

        return BrandActions.getListSuccess(response.data.brands);
      } catch (error) {
        var errorMessage = error.response ? error.response.statusText : error.message;
        return BrandActions.getListError(errorMessage);
      }
    }),
  );

export const brandEpics = [createBrand, updateBrand, deleteBrand, getList];
