import {Router} from 'express';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
const router = Router();
import {createFranchise,setManager,getFranchises,getFranchiseStockByInventory,createFranchiseStock,getFranchise,updateFranchise,deleteFranchise,updateProductStock,getFranchiseStock} from '../controllers/franchise.controller.js'


router.route("/create").post(verifyJWT,createFranchise);
router.route("/set-manager").post(verifyJWT,setManager);
router.route("/get-franchises").post(verifyJWT,getFranchises);
router.route("/get-franchise").post(verifyJWT,getFranchise);
router.route("/update-franchise").patch(verifyJWT,updateFranchise);
router.route("/get-franchise-stock").post(verifyJWT,getFranchiseStock);
router.route("/get-franchisestock").post(verifyJWT,getFranchiseStockByInventory);
router.route("/update-product-stock").patch(verifyJWT,updateProductStock);
router.route("/delete-franchise/:franchiseId").delete(verifyJWT,deleteFranchise);
router.route("/create-franchise-stock").post(verifyJWT,createFranchiseStock);
export default router;