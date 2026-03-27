import express from 'express';
import { getCart, saveCart } from '../controllers/cart.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/').get(protect, getCart).put(protect, saveCart);

export default router;
