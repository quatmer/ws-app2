import { AppActions } from 'src/redux/app/action';
import Axios from 'axios';
import { BaseService } from './base.service';
import { IBrand } from '@shared/models/brand';
import { BrandActions } from 'src/redux/brand/action';

export class BrandService extends BaseService {
  create(name: string) {
    return new Promise<IBrand>(async (resolve, reject) => {
      try {
        const response = await Axios.post<{ brand: IBrand }>('/brand', { name });
        const { brand } = response.data;

        this.dispatch(BrandActions.add(brand));
        this.dispatch(
          AppActions.showNotification('Create brand', `Brand [${brand.name}] successfully created`, 'information'),
        );
        resolve(brand);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        this.dispatch(AppActions.showNotification('Error on create brand', message, 'danger'));
        reject(message);
      }
    });
  }

  update(id: string, name: string) {
    return new Promise<IBrand>(async (resolve, reject) => {
      try {
        const response = await Axios.post<{ brand: IBrand }>('/brand/' + id, { name });
        const { brand } = response.data;
        this.dispatch(BrandActions.update(brand));
        this.dispatch(
          AppActions.showNotification('Update brand', `Brand [${brand.name}] successfully updated`, 'information'),
        );
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
        await Axios.delete('/brand/' + id);
        this.dispatch(BrandActions.delete(id));
        this.dispatch(AppActions.showNotification('Delete brand', `Brand successfully deleted`, 'information'));
        resolve();
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        this.dispatch(AppActions.showNotification('Error on delete brand', message, 'danger'));
        reject(message);
      }
    });
  }

  getList() {
    return new Promise<IBrand[]>(async (resolve, reject) => {
      try {
        const response = await Axios.get<{ brands: IBrand[] }>('/brand', {});

        this.dispatch(BrandActions.setList(response.data.brands));
        resolve(response.data.brands);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        this.dispatch(AppActions.showNotification('Error on get list of brand', message, 'danger'));
        reject(message);
      }
    });
  }
}
