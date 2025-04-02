import {Router} from 'express';
import {getFranchiseHighestSellingProducts,getLowStock,getRevnueByMonth,stockInFranchise,productSalesByMonth} from '../controllers/dashboard.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.use(verifyJWT);

router.route('/highest-selling-products/:franchiseId').get(getFranchiseHighestSellingProducts);
router.route('/low-stock/:franchiseId').get(getLowStock);
router.route('/revenue-by-month/:franchiseId').get(getRevnueByMonth);
router.route('/stock-in-franchise/:inventoryId/:franchiseId').get(stockInFranchise);
router.route('/product-sales-by-month/:franchiseId').get(productSalesByMonth);

export default router;