export interface IProductCategory extends IProductCategoryDocument {
  _id: string;
  child: IProductCategory[];
}
export interface IProductCategoryDocument {
  name: string;
  productCount: number;
  child: IProductCategoryDocument[];
}
