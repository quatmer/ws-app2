export interface IProductCategory extends IProductCategoryDocument {
  _id: string;
}
export interface IProductCategoryDocument {
  name: string;
  parent: string;
}
