import { IProduct } from '@shared/models/product';

export interface IProductDTO {
  name: string;
  description: string;
  unit: string;
  price: number;
  brand: string;
  categories: string[];
}
