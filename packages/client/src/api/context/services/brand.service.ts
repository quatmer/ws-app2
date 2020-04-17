import { AppUtil } from './../../utils/app.util';
import Axios from 'axios';
import { BaseService } from './base.service';
import { IProductBrand } from '@shared/models/product-brand';
import { BrandActions } from '../../../redux/product-brand/action';

export class BrandService extends BaseService {
  create(name: string) {
    return new Promise<IProductBrand>(async (resolve, reject) => {
      try {
        const response = await Axios.post<{ brand: IProductBrand }>('/product-brand', { name });
        const { brand } = response.data;

        this.dispatch(BrandActions.add(brand));
        AppUtil.showNotification('info', 'Create brand', `Brand [${brand.name}] successfully created`);
        resolve(brand);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        AppUtil.showNotification('error', 'Error on create brand', message);
        reject(message);
      }
    });
  }

  update(id: string, name: string) {
    return new Promise<IProductBrand>(async (resolve, reject) => {
      try {
        const response = await Axios.post<{ brand: IProductBrand }>('/product-brand/' + id, { name });
        const { brand } = response.data;
        this.dispatch(BrandActions.update(brand));
        AppUtil.showNotification('info', 'Update brand', `Brand [${brand.name}] successfully updated`);
        resolve(brand);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        reject(message);
      }
    });
  }

  delete(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await Axios.delete('/product-brand/' + id);
        this.dispatch(BrandActions.delete(id));
        AppUtil.showNotification('info', 'Delete brand', `Brand successfully deleted`);
        resolve();
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        AppUtil.showNotification('error', 'Error on delete brand', message);
        reject(message);
      }
    });
  }

  getList() {
    return new Promise<IProductBrand[]>(async (resolve, reject) => {
      try {
        const response = await Axios.get<{ brands: IProductBrand[] }>('/product-brand', {});

        this.dispatch(BrandActions.setList(response.data.brands));
        resolve(response.data.brands);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        AppUtil.showNotification('error', 'Error on get list of brand', message);
        reject(message);
      }
    });
  }
}
