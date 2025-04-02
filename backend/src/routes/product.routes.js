import {Router} from 'express';
import {createProduct,getProducts,getProductsByBusinessId,updateProduct,deleteProduct} from '../controllers/product.controller.js';
import {verifyJWT} from '../middlewares/auth.middlewares.js';

const router = Router();

router.use(verifyJWT);
router.route('/').post(createProduct)
router.route('/:inventoryId').get(getProducts);
router.route('/products').post(getProductsByBusinessId);
router.route('/:productId').patch(updateProduct).delete(deleteProduct);


export default router;