import { ProductBrandEntity } from './../entities/product-brand.entity';
import { ProductEntity } from './../entities/product.entity';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../util/HttpError';
import { ProductCategoryEntity } from '../entities/product-category.entity';

const insertProduct = async (req: Request, res: Response, next: NextFunction) => {
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

const getProductList = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Product getList request body:', req.body);

  try {
    const products = await ProductEntity.find();
    res.status(200).send({ message: 'Products loaded.', products });
  } catch (err) {
    next(new HttpError(err.message, 400));
    return;
  }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  //check missing parameter
  if (!id) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  const product = await ProductEntity.findById(id);

  //check category exist
  if (!product) {
    next(new HttpError('Product not found.', 404));
    return;
  }

  try {
    await product.remove();
  } catch (err) {
    next(new HttpError(err.message, 400));
    return;
  }

  res.status(200).send({ message: 'Product deleted.' });
};

const updateProduct = async (req: Request) => {
  //   const  product:IProduct  = req.body;
  // if (!id || !name) {
  //   next(new HttpError('Missing parameter.', 400));
  //   return;
  // }
  // // checking is product exist
  // const product = await ProductEntity.findById(id);
  // if (!product) {
  //   next(new HttpError('Product not exist.', 400));
  //   return;
  // }
  // // update model
  // product.name = name;
  // // checking document validation
  // const validationError = await product.validateSync();
  // if (validationError) {
  //   next(new HttpError(validationError.message, 400));
  //   return;
  // }
  // try {
  //   // save model
  //   await product.save();
  // } catch (err) {
  //   next(new HttpError(err.message, 404));
  //   return;
  // }
  // res.status(200).send({ message: 'Product updated.', category: product });
};

export const ProductController = {
  getProductList: getProductList,
  insertProduct: insertProduct,
  deleteProdut: deleteProduct,
  updateProduct: updateProduct,
};
