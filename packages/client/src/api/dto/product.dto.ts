import { IProduct } from '@shared/models/product';

export interface IProductDTO {
  id?: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  brand: string;
  categories: string[];
}
