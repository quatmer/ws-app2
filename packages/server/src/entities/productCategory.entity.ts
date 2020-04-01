import { Schema, Document, model } from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');
import { IProductCategoryDocument } from '@shared/models/productCategory';

const ProductCategorySchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    parent: String,
  },
  { timestamps: true, versionKey: false, bufferCommands: false },
);

mongooseUniqueValidator(ProductCategorySchema);

export interface ProductCategoryDocument extends IProductCategoryDocument, Document {}

export const ProductCategoryEntity = model<ProductCategoryDocument>('ProductCategory', ProductCategorySchema);
