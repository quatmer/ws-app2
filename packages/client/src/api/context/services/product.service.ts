import { IProduct } from '@shared/models/product';
import { ProductActions } from './../../../redux/product/action';
import Axios from 'axios';
import { BaseService } from './base.service';
import { IProductDTO } from '../../dto/product.dto';
import { AppActions } from '../../../redux/app/action';

export class ProductService extends BaseService {
  create(newProduct: IProductDTO) {
    return new Promise<IProduct>(async (resolve, reject) => {
      try {
        const response = await Axios.post<{ product: IProduct }>('/product', { ...newProduct });
        const { product } = response.data;

        this.dispatch(ProductActions.add(product));
        this.dispatch(
          AppActions.showNotification(
            'Create product',
            `Product [${product.name}] successfully created`,
            'information',
          ),
        );
        resolve(product);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        this.dispatch(AppActions.showNotification('Error on create product', message, 'danger'));
        reject(message);
      }
    });
  }

  // update(id: string, name: string) {
  //   return new Promise<IProductBrand>(async (resolve, reject) => {
  //     try {
  //       const response = await Axios.post<{ brand: IProductBrand }>('/brand/' + id, { name });
  //       const { brand } = response.data;
  //       this.dispatch(BrandActions.update(brand));
  //       this.dispatch(
  //         AppActions.showNotification('Update brand', `Brand [${brand.name}] successfully updated`, 'information'),
  //       );
  //       resolve(brand);
  //     } catch (error) {
  //       const message = !!error.response ? error.response.statusText : error.message;
  //       reject(message);
  //     }
  //   });
  // }

  // delete(id: string) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       await Axios.delete('/brand/' + id);
  //       this.dispatch(BrandActions.delete(id));
  //       this.dispatch(AppActions.showNotification('Delete brand', `Brand successfully deleted`, 'information'));
  //       resolve();
  //     } catch (error) {
  //       const message = !!error.response ? error.response.statusText : error.message;
  //       this.dispatch(AppActions.showNotification('Error on delete brand', message, 'danger'));
  //       reject(message);
  //     }
  //   });
  // }

  // getList() {
  //   return new Promise<IProductBrand[]>(async (resolve, reject) => {
  //     try {
  //       const response = await Axios.get<{ brands: IProductBrand[] }>('/brand', {});

  //       this.dispatch(BrandActions.setList(response.data.brands));
  //       resolve(response.data.brands);
  //     } catch (error) {
  //       const message = !!error.response ? error.response.statusText : error.message;
  //       this.dispatch(AppActions.showNotification('Error on get list of brand', message, 'danger'));
  //       reject(message);
  //     }
  //   });
  // }
}
