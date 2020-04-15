import Axios from 'axios';
import { ProductActions } from './../../../redux/product/action';
import { BaseService } from './base.service';
import { IProductDTO } from '../../dto/product.dto';
import { IProduct } from '../../../../../shared/models/product';
import { AppUtil } from 'src/api/utils/app.util';

export class ProductService extends BaseService {
  create(newProduct: IProductDTO) {
    return new Promise<IProduct>(async (resolve, reject) => {
      try {
        const response = await Axios.post<{ product: IProduct }>('/product', { ...newProduct });
        const { product } = response.data;

        this.dispatch(ProductActions.add(product));
        AppUtil.showNotification('info', 'Create product', `Product [${product.name}] successfully created`);
        resolve(product);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        AppUtil.showNotification('error', 'Error on create product', message);
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
        AppUtil.showNotification('info', 'Update product', `Product [${product.name}] successfully updated`);
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
        AppUtil.showNotification('info', 'Delete product', `Product successfully deleted.`);
        resolve();
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        AppUtil.showNotification('error', 'Error on delete product.', message);
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
        AppUtil.showNotification('error', 'Error on get list of product.', message);
        reject(message);
      }
    });
  }
}
