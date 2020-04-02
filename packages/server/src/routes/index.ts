import { Router } from 'express';
import authRouter from './auth.route';
import productCategoryRouter from './product.category.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/product-category', productCategoryRouter);

export default router;
