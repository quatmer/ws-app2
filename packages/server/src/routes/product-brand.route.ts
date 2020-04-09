import { checkAuthentication } from '../middlewares/auth.middleware';
import { Router } from 'express';
import { ProductBrandController } from '../controllers/product-brand.controller';

const productBrandRouter = Router();

productBrandRouter.post('/', [checkAuthentication], ProductBrandController.createBrand);
productBrandRouter.post('/:id', [checkAuthentication], ProductBrandController.updateBrand);
productBrandRouter.get('/', [checkAuthentication], ProductBrandController.getBrands);
productBrandRouter.delete('/:id', [checkAuthentication], ProductBrandController.deleteBrand);

export default productBrandRouter;
