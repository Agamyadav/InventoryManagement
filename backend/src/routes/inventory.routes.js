import {Router} from 'express';
import {createInventory, getInventories, getInventory, updateInventory, deleteInventory} from '../controllers/inventory.controller.js';
import {verifyJWT} from '../middlewares/auth.middlewares.js';   
const router = Router();

router.use(verifyJWT);

router.route('/:businessId').post(createInventory).get(getInventories);
router.route('/get-inventory/:inventoryId').get(getInventory);
router.route('/update-inventory').patch(updateInventory);
router.route('/delete-inventory/:inventoryId').delete(deleteInventory);



export default router;