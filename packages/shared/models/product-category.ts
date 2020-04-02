export interface IProductCategory extends IProductCategoryDocument {
  _id: string;
  children: IProductCategory[];
}
export interface IProductCategoryDocument {
  name: string;
  productCount: number;
  children: IProductCategoryDocument[];
}
