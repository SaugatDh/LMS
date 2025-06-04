import express from "express";
const router=express.Router();
import { authenticateUser } from "../middlewares/authentication/auth.middleware.js";
import { isAuthenticated } from "../middlewares/authentication/role.middleware.js";
import{
  test,
  userRegistration,
  login,
  loggedOut,
  verifyOtp,
  sendOtpAgain
}from "../controllers/authentication/auth.controller.js";
import {upload_profile} from "../utils/multerConfig.js";
router.route("/test").get(authenticateUser,isAuthenticated(["admin","moderator"]),test);
router.route("/registration").post(upload_profile.single("profile"),userRegistration);
router.route("/login").post(login);
router.route("/logged-out").get(authenticateUser,loggedOut);
router.route("/verify-otp/:otpCode").post(verifyOtp);
router.route("/send-otp-again").post(sendOtpAgain);
export default router;