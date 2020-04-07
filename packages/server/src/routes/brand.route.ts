import { checkAuthentication } from '../middlewares/auth.middleware';
import { Router } from 'express';
import { BrandController } from '../controllers/brand.controller';

const brandRouter = Router();

brandRouter.post('/', [checkAuthentication], BrandController.createBrand);
brandRouter.post('/:id', [checkAuthentication], BrandController.updateBrand);
brandRouter.get('/', [checkAuthentication], BrandController.getBrands);
brandRouter.delete('/:id', [checkAuthentication], BrandController.deleteBrand);

export default brandRouter;
