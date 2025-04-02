import { Router } from "express";
import { sendEmailVerification, verifyEmailVerification, registerUser,loginUser,changePassword,updateDetails,getCurrentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/send-email-verification").post(sendEmailVerification);
router.route("/verify-email-verification").post(verifyEmailVerification);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/change-password").patch(verifyJWT,changePassword);
router.route("/update-details").patch(verifyJWT,updateDetails);
router.route("/get-current-user").get(verifyJWT,getCurrentUser);


export default router;