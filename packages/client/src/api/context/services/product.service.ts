import Axios from 'axios';
import { ProductActions } from './../../../redux/product/action';
import { BaseService } from './base.service';
import { IProductDTO } from '../../dto/product.dto';
import { AppActions } from '../../../redux/app/action';
import { IProduct } from '../../../../../shared/models/product';

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

  update(uProduct: IProductDTO) {
    return new Promise<IProduct>(async (resolve, reject) => {
      try {
        const response = await Axios.post<{ product: IProduct }>('/product/' + uProduct.id, { uProduct });
        const { product } = response.data;
        this.dispatch(ProductActions.update(product));
        this.dispatch(
          AppActions.showNotification(
            'Update product',
            `Product [${product.name}] successfully updated`,
            'information',
          ),
        );
        resolve(product);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        reject(message);
      }
    });
  }

  delete(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await Axios.delete('/product/' + id);
        this.dispatch(ProductActions.delete(id));
        this.dispatch(AppActions.showNotification('Delete product', `Product successfully deleted.`, 'information'));
        resolve();
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        this.dispatch(AppActions.showNotification('Error on delete product.', message, 'danger'));
        reject(message);
      }
    });
  }

  getList() {
    return new Promise<IProduct[]>(async (resolve, reject) => {
      try {
        const response = await Axios.get<{ products: IProduct[] }>('/product', {});
        this.dispatch(ProductActions.list(response.data.products));
        resolve(response.data.products);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        this.dispatch(AppActions.showNotification('Error on get list of product.', message, 'danger'));
        reject(message);
      }
    });
  }
}
