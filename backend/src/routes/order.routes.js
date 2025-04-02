import {Router} from 'express';
import {createOrder, getOrders,getOrder,updateOrderStatus,deleteOrder} from '../controllers/order.controller.js';
import {verifyJWT} from '../middlewares/auth.middlewares.js';

const router = Router();
router.use(verifyJWT);

router.route('/:franchiseId').post(createOrder).get(getOrders);
router.route('/:orderId').get(getOrder).patch(updateOrderStatus).delete(deleteOrder);


export default router;