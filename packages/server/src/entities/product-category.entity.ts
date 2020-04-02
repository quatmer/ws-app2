import { Schema, Document, model } from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');
import { IProductCategoryDocument } from '@shared/models/product-category';

const ProductCategoryChildSchema = new Schema({ name: String });

const ProductCategorySchema = new Schema(
  {
    child: ProductCategoryChildSchema,
    children: [ProductCategoryChildSchema],
  },
  { timestamps: true, versionKey: false, bufferCommands: false },
);

mongooseUniqueValidator(ProductCategorySchema);

export interface ProductCategoryDocument extends IProductCategoryDocument, Document {}

export const ProductCategoryEntity = model<ProductCategoryDocument>('ProductCategory', ProductCategorySchema);
