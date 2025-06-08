import express from 'express';
const router=express.Router();
import {getUsers,updateProfile} from "../controllers/user/user.controller.js";
import { authenticateUser } from "../middlewares/authentication/auth.middleware.js";
router.route("/").get(authenticateUser,getUsers);
router.route("/update-user/").patch(authenticateUser, updateProfile);
export default router;