import { Schema, Document, model } from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');
import { IProductDocument } from '@shared/models/product';

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
    unit: { type: String, required: true },
    price: { type: Number, required: true },
    categories: [{ type: String, required: true }],
  },
  { timestamps: true, versionKey: false, bufferCommands: false },
);

mongooseUniqueValidator(ProductSchema);

export interface ProductDocument extends IProductDocument, Document {}

export const ProductEntity = model<ProductDocument>('Product', ProductSchema);
