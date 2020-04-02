import { JWT } from './../util/JwtHelper';
import { HttpError } from './../util/HttpError';
import { ProductCategoryEntity, ProductCategoryDocument } from './../entities/product-category.entity';
import { Request, Response, NextFunction } from 'express';
import { IProductCategoryDocument } from '@shared/models/product-category';

export namespace ProductCategoryController {
  export const update = async (req: Request, res: Response, next: NextFunction) => {
    const productCategoryDocument = req.body.category as IProductCategoryDocument;

    console.log('Request ProductCategory Document : ' + productCategoryDocument);

    if (!productCategoryDocument) {
      next(new HttpError('Wrong parameters, cannot read product category object', 400));
      return;
    }

    let productCategory = new ProductCategoryEntity();
    productCategory.name = 'Elektronik';
    productCategory.children = [
      {
        name: 'Buzdolabi',
        productCount: 0,
        children: [
          { name: 'Iki kapili', productCount: 0, children: [] },
          { name: 'Tek kapili', productCount: 0, children: [] },
          { name: 'No frost', productCount: 0, children: [] },
        ],
      },
    ];

    // let productCategory: IProductCategoryDocument = {
    //   name:'Elektronik', productCount: 0, children: [
    //     {name:'Buzdolabi', productCount: 0, children:[
    //       {name:'Iki kapili', productCount: 0, children:[]},
    //       {name:'Tek kapili', productCount: 0, children:[]}
    //       {name:'No frost', productCount: 0, children:[]}
    //     ]}
    //   ]
    // }

    // productCategory.name = productCategoryDocument.name;
    // productCategory.children = productCategoryArray;
    // //productCategory.children = new IProductCategoryDocument();

    console.log('Request ProductCategory Object : ' + productCategory);

    // Checking document validation
    const validationError = await productCategory.validateSync();
    if (validationError) {
      next(new HttpError(validationError.message, 400));
      return;
    }

    // Remove All Data
    try {
      await ProductCategoryEntity.remove({});
    } catch (err) {
      next(new HttpError(err.message, 404));
      return;
    }

    // // Checking is product category exist and deleting old category
    // try {
    //   const isDataExist = await ProductCategoryEntity.findOne();
    //   if (isDataExist) {
    //     await isDataExist.remove();
    //   }
    // } catch (err) {
    //   next(new HttpError(err.message, 404));
    //   return;
    // }

    // Saving new product category
    try {
      const result = await productCategory.save();
      console.log('Product category save result : ', result);
    } catch (err) {
      next(new HttpError(err.message, 404));
      return;
    }

    // Sending response with token
    res.status(200).send({ message: 'update product category successful' });
  };

  export const get = async (req: Request, res: Response, next: NextFunction) => {
    let productCategory: ProductCategoryDocument | null;
    try {
      productCategory = await ProductCategoryEntity.findOne();
    } catch (err) {
      next(new HttpError(err.message, 404));
      return;
    }

    // Recreating token
    // Auth middleware create newToken and send in headers section
    // const token = JWT.reCreateToken(res);

    // Sending response with token
    res.status(200).send({ message: 'getting product category successful', productCategory });
  };
}
