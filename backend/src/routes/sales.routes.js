import {Router} from 'express';
import {createSale, getSales,getSale,deleteSale} from '../controllers/sales.controller.js';
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJWT);

router.route('/:franchiseId').get(getSales).post(createSale);
router.route('/:saleId').get(getSale).delete(deleteSale);

export default router;