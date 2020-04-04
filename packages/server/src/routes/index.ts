import { Router } from 'express';
import authRouter from './auth.route';
import productCategoryRouter from './product-category.route';
import productRouter from './product-route';

const router = Router();

router.use('/auth', authRouter);
router.use('/product-category', productCategoryRouter);
router.use('/product', productRouter);

export default router;
