import { HttpError } from './../util/HttpError';
import { ProductCategoryEntity, ProductCategoryDocument } from './../entities/product-category.entity';
import { Request, Response, NextFunction } from 'express';
import { IProductCategory } from '@shared/models/product-category';

const update = async (req: Request, res: Response, next: NextFunction) => {
  const productCategory = req.body.category as IProductCategory;

  if (!productCategory) {
    next(new HttpError('Wrong parameters, cannot read product category object', 400));
    return;
  }

  let productCategoryEntity = new ProductCategoryEntity();
  productCategoryEntity._id = productCategory._id;
  productCategoryEntity.name = productCategory.name;
  productCategoryEntity.children = productCategory.children;

  console.log('Request ProductCategory Object : ' + productCategory);

  // Checking document validation
  const validationError = await productCategoryEntity.validateSync();
  if (validationError) {
    next(new HttpError(validationError.message, 400));
    return;
  }

  // Checking is product category exist
  try {
    const model = await ProductCategoryEntity.findById(productCategoryEntity._id);
    if (model) {
      // model found, update it
      model.name = productCategoryEntity.name;
      model.children = productCategoryEntity.children;
      const updateResult = await model.save();
      console.log('Product category update result : ', updateResult);
      res.status(200).send({ message: 'update product-category successful', category: updateResult });
    } else {
      // Model cannot found, insert new record
      const insertResult = await productCategoryEntity.save();
      console.log('Product category insert result : ', insertResult);
      res.status(200).send({ message: 'insert product-category successful', category: insertResult });
    }
  } catch (err) {
    next(new HttpError(err.message, 404));
    return;
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await ProductCategoryEntity.find().exec();
    res.status(200).send({ message: 'getting product categories successful', categories });
  } catch (err) {
    next(new HttpError(err.message, 404));
    return;
  }

  // Recreating token
  // Auth middleware create newToken and send in headers section
  // const token = JWT.reCreateToken(res);

  // Sending response with token
};

const deleteModel = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const category = await ProductCategoryEntity.findById(id);
    if (category) {
      await category.remove();
      console.log('category deleted :', id);
      res.status(200).send({ message: 'deleting category successful' });
    } else {
      next(new HttpError('Category not found', 404));
      return;
    }
  } catch (err) {
    next(new HttpError(err.message, 404));
    return;
  }
};

export const ProductCategoryController = {
  update,
  get,
  deleteModel,
};
