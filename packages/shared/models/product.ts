export interface IProduct extends IProductDocument {
  _id: string;
}
export interface IProductDocument {
  name: string;
  description: string;
  unit: string;
  price: number;
  categories: string[];
}