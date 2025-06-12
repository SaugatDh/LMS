import express from "express";
import {enrollInCourse,fetchCoursesByTeacher,fetchEnrolledCourses,createCourse,removeCourse,updateCourse,fetchAllCourses} from "../controllers/course/course.controller.js";
import { authenticateUser } from "../middlewares/authentication/auth.middleware.js";
import { isAuthenticated } from "../middlewares/authentication/role.middleware.js";

const router=express.Router();

// Routes for course management
router.route("/").get(authenticateUser,isAuthenticated(["ADMIN"]),fetchAllCourses);
router.route("/create").post(authenticateUser,isAuthenticated(["TEACHER","ADMIN"]),createCourse);
router.route("/remove/:courseId").delete(authenticateUser,isAuthenticated(["TEACHER","ADMIN"]),removeCourse);
router.route("/update/:courseId").patch(authenticateUser,isAuthenticated(["TEACHER","ADMIN"]),updateCourse);
router.route("/enroll").post(authenticateUser,enrollInCourse);
router.route("/enrolled").get(authenticateUser,fetchEnrolledCourses);
router.route("/teacher-courses").get(authenticateUser,isAuthenticated(["TEACHER","ADMIN"]),fetchCoursesByTeacher);
export default router;