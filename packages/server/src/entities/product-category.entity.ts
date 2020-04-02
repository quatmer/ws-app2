import { Schema, Document, model } from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');
import { IProductCategoryDocument } from '@shared/models/product-category';

const ProductCategorySchema = new Schema(
  {
    name: String,
    productCount: Number,
  },
  { timestamps: true, versionKey: false, bufferCommands: false },
);

ProductCategorySchema.add({
  children: [ProductCategorySchema],
});

mongooseUniqueValidator(ProductCategorySchema);

export interface ProductCategoryDocument extends IProductCategoryDocument, Document {}

export const ProductCategoryEntity = model<ProductCategoryDocument>('ProductCategory', ProductCategorySchema);
