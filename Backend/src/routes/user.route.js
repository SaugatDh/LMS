import express from 'express';
const router=express.Router();
import {getUsers,updateProfile} from "../controllers/user/user.controller.js";
<<<<<<< HEAD
router.route("/").get(getUsers);
router.route("/update-user/:id").patch(updateProfile);
=======
import { authenticateUser } from "../middlewares/authentication/auth.middleware.js";
import { isAuthenticated } from '../middlewares/authentication/role.middleware.js';
router.route("/").get(authenticateUser,isAuthenticated(["ADMIN"]),getUsers);
router.route("/update-user/:id").patch(authenticateUser, isAuthenticated(["STUDENT","ADMIN","TEACHER"]), updateProfile);
>>>>>>> upstream/main
export default router;