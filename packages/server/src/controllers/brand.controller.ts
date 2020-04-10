import { HttpError } from './../util/HttpError';
import { Request, Response, NextFunction } from 'express';
import { BrandEntity, BrandDocument } from './../entities/brand.entity';

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  const brand = new BrandEntity({ name });

  const validationError = await brand.validateSync();
  if (validationError) {
    next(new HttpError(validationError.message, 400));
    return;
  }

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

  const brand = await BrandEntity.findById(id);

  if (!brand) {
    next(new HttpError('Brand not exist.', 400));
    return;
  }

  brand.name = name;

  const validationError = await brand.validateSync();
  if (validationError) {
    next(new HttpError(validationError.message, 400));
    return;
  }

  try {
    await brand.save();
  } catch (err) {
    next(new HttpError(err.message, 404));
    return;
  }

  res.status(200).send({ message: 'Brand updated.', brand: brand });
};

const getBrands = async (_: Request, res: Response, next: NextFunction) => {
  let brands: BrandDocument[];

  try {
    brands = await BrandEntity.find();
  } catch (err) {
    next(new HttpError(err.message, 400));
    return;
  }

  res.status(200).send({ message: 'Brands loaded. ', brands });
};

const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    next(new HttpError('Missing parameter.', 400));
    return;
  }

  const brand = await BrandEntity.findById(id);

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

export const BrandController = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
};