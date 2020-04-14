import { ProductBrandEntity } from './../entities/product-brand.entity';
import { IProductCategory } from '@shared/models/product-category';
import { ProductEntity } from './../entities/product.entity';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../util/HttpError';
import { ProductCategoryEntity } from '../entities/product-category.entity';

const insert = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, unit, price, brand: _brand, categories: _categories } = req.body;

  console.log('Request body:', req.body);

  //check categories
  if (!_categories || _categories.length === 0) {
    next(new HttpError('Categories cannot found', 500));
    return;
  }
  const categories = await ProductCategoryEntity.find({ _id: _categories });
  console.log({ cats: categories });

  //check brand
  const brand = await ProductBrandEntity.findById(_brand);
  console.log('Brand:', brand);
  if (!brand) {
    next(new HttpError('Brand cannot found', 500));
    return;
  }

  let product = new ProductEntity();
  product.name = name;
  product.description = description;
  product.unit = unit;
  product.price = price;
  product.brand = brand;
  product.categories = categories;

  console.log('[product-controller:insert] Request Product Object : ' + JSON.stringify(product));

  //Checking document validation
  const validationError = await product.validateSync();
  if (validationError) {
    next(new HttpError(validationError.message, 400));
    return;
  }

  try {
    var result = await product.save();
    res.status(200).send({ message: 'insert product successful', product: result });
  } catch (err) {
    next(new HttpError(err.message, 404));
    return;
  }
};

export const ProductController = {
  insert,
};
