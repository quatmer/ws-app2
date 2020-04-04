import { checkAuthentication } from '../middlewares/auth.middleware';
import { Router } from 'express';
import { ProductCategoryController } from '../controllers/product-category.controller';

const productCategoryRouter = Router();

productCategoryRouter.post('/', [checkAuthentication], ProductCategoryController.update);
productCategoryRouter.get('/', [checkAuthentication], ProductCategoryController.get);
productCategoryRouter.delete('/:id', [checkAuthentication], ProductCategoryController.deleteModel);

export default productCategoryRouter;
