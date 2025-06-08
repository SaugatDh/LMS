import express from 'express';
const router=express.Router();
import {getUsers,updateProfile} from "../controllers/user/user.controller.js";
router.route("/").get(getUsers);
router.route("/update-user/:id").patch(updateProfile);
export default router;