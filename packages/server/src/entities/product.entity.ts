import { Schema, Document, model } from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');
import { IProductDocument } from '@shared/models/product';
import { ProductBrandSchema } from './product-brand.entity';
import { ProductCategorySchema } from './product-category.entity';

const InfoSchema = new Schema({
  name: { type: String },
});

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
    unit: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: InfoSchema, required: true },
    categories: [{ type: InfoSchema, required: true }],
  },
  { timestamps: true, versionKey: false, bufferCommands: false },
);

mongooseUniqueValidator(ProductSchema);

export interface ProductDocument extends IProductDocument, Document {}

export const ProductEntity = model<ProductDocument>('Product', ProductSchema);
