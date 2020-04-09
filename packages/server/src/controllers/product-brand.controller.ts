import { HttpError } from './../util/HttpError';
import { Request, Response, NextFunction } from 'express';
import { ProductBrandEntity } from './../entities/product-brand.entity';

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  // creating new model
  const brand = new ProductBrandEntity({ name });

  // checking document validation
  const validationError = await brand.validateSync();
  if (validationError) {
    next(new HttpError(validationError.message, 400));
    return;
  }

  //saving model
  try {
    await brand.save();
  } catch (err) {
    next(new HttpError(err.message, 404));
    return;
  }

  res.status(201).send({ message: 'Brand created.', brand: brand.toJSON() });
};

const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  // checking brand is exist
  const brand = await ProductBrandEntity.findById(id);

  if (!brand) {
    next(new HttpError('Brand not exist.', 400));
    return;
  }

  //updating model
  brand.name = name;

  // checking document validation
  const validationError = await brand.validateSync();
  if (validationError) {
    next(new HttpError(validationError.message, 400));
    return;
  }

  try {
    //saving model
    await brand.save();
  } catch (err) {
    next(new HttpError(err.message, 404));
    return;
  }
  res.status(200).send({ message: 'Brand updated.', brand });
};

const getBrands = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await ProductBrandEntity.find();
    res.status(200).send({ message: 'Brands loaded. ', brands });
  } catch (err) {
    next(new HttpError(err.message, 400));
    return;
  }
};

const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  //checking missing parameter
  if (!id) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  const brand = await ProductBrandEntity.findById(id);

  //checking brand is exist
  if (!brand) {
    next(new HttpError('Brand not found.', 404));
    return;
  }

  try {
    await brand.remove();
  } catch (err) {
    next(new HttpError(err.message, 400));
    return;
  }

  res.status(200).send({ message: 'Brand deleted.' });
};

export const ProductBrandController = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
};
