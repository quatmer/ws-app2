import { checkAuthentication } from './../middlewares/auth.middleware';
import { Router } from 'express';
import { ProductCategoryController } from '../controllers/product-category.controller';

const productCategoryRouter = Router();

productCategoryRouter.post('/update', [checkAuthentication], ProductCategoryController.update);
productCategoryRouter.get('/get', [checkAuthentication], ProductCategoryController.get);

export default productCategoryRouter;
