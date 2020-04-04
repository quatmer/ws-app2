import { ProductEntity } from './../entities/product.entity';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../util/HttpError';

const insert = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, unit, price, categories } = req.body;

  let product = new ProductEntity();
  product.name = name;
  product.description = description;
  product.unit = unit;
  product.price = price;
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
