import { ProductController } from './../controllers/product.controller';
import { checkAuthentication } from './../middlewares/auth.middleware';
import { Router } from 'express';

const productRouter = Router();

productRouter.post('/', [checkAuthentication], ProductController.insert);

export default productRouter;
