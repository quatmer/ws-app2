import { Schema, Document, model } from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');
import { IBrandDocument } from '@shared/models/brand';

const BrandSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false, bufferCommands: false, collection: 'brands' },
);

export interface BrandDocument extends IBrandDocument, Document {}

export const BrandEntity = model<BrandDocument>('Brand', BrandSchema);
