import { Schema, Document, model } from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');
import { IBrandDocument } from '@shared/models/product-brand';

export const ProductBrandSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false, bufferCommands: false, collection: 'brands' },
);

export interface ProductBrandDocument extends IBrandDocument, Document {}

export const ProductBrandEntity = model<ProductBrandDocument>('Brand', ProductBrandSchema);
