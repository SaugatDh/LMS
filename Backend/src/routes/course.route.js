import express from "express";
import {createCourse,removeCourse,updateCourse,fetchAllCourses} from "../controllers/course/course.controller.js";
import { authenticateUser } from "../middlewares/authentication/auth.middleware.js";
import { isAuthenticated } from "../middlewares/authentication/role.middleware.js";

const router=express.Router();

// Routes for course management
router.route("/").get(fetchAllCourses);
router.route("/create").post(authenticateUser,isAuthenticated(["TEACHER","ADMIN"]),createCourse);
router.route("/remove/:course_id").delete(authenticateUser,isAuthenticated(["TEACHER","ADMIN"]),removeCourse);
router.route("/update/:course_id").patch(authenticateUser,isAuthenticated(["TEACHER","ADMIN"]),updateCourse);
export default router;