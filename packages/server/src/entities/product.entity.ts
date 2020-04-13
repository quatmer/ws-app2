import { Schema, Document, model } from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');
import { IProductDocument } from '@shared/models/product';
import { ProductBrandSchema } from './product-brand.entity';
import { ProductCategorySchema } from './product-category.entity';

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
    unit: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: ProductBrandSchema, required: true },
    categories: [{ type: ProductCategorySchema, required: true }],
  },
  { timestamps: true, versionKey: false, bufferCommands: false },
);

mongooseUniqueValidator(ProductSchema);

export interface ProductDocument extends IProductDocument, Document {}

export const ProductEntity = model<ProductDocument>('Product', ProductSchema);
