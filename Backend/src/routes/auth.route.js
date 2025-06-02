import express from "express";
const router=express.Router();
import {isLoggedIn} from "../middlewares/authentication/isLoggedIn";
import {isAuthenticated} from "../middlewares/authentication/role.middleware";
import{
  test,
  userRegistration,
  login,
  loggedOut,
  verifyOtp,
  sendOtpAgain
}from "../controllers/authentication/authentication";
import {upload_profile} from "../utils/multer.config";
router.route("/test").get(isLoggedIn,isAuthenticated(["admin","moderator"]),test);
router.route("/registration").post(upload_profile.single("profile"),userRegistration);
router.route("/login").post(login);
router.route("/logged-out").get(isLoggedIn,loggedOut);
router.route("/verify-otp/:otpCode").post(verifyOtp);
router.route("/send-otp-again").post(sendOtpAgain);
export default router;