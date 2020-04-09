import { Schema, Document, model } from 'mongoose';
import { IProductBrandDocument } from '@shared/models/product-brand';

const ProductBrandSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false, bufferCommands: false, collection: 'product-brands' },
);

export interface ProductBrandDocument extends IProductBrandDocument, Document {}

export const ProductBrandEntity = model<ProductBrandDocument>('ProductBrand', ProductBrandSchema);
