import express from "express";
import {enrollInCourse,fetchCoursesByTeacher,fetchEnrolledCourses,createCourse,removeCourse,updateCourse,fetchAllCourses} from "../controllers/course/course.controller.js";
import { authenticateUser } from "../middlewares/authentication/auth.middleware.js";
import { isAuthenticated } from "../middlewares/authentication/role.middleware.js";

const router=express.Router();

// Routes for course management
router.route("/").get(authenticateUser,isAuthenticated(["ADMIN"]),fetchAllCourses);
router.route("/create").post(authenticateUser,isAuthenticated(["TEACHER","ADMIN"]),createCourse);
router.route("/remove/:course_id").delete(authenticateUser,isAuthenticated(["TEACHER","ADMIN"]),removeCourse);
router.route("/update/:course_id").patch(authenticateUser,isAuthenticated(["TEACHER","ADMIN"]),updateCourse);
router.route("/:course_id/enroll").post(authenticateUser,enrollInCourse);
router.route("/enrolled").get(authenticateUser,fetchEnrolledCourses);
router.route("/teacher-courses").get(authenticateUser,isAuthenticated(["TEACHER","ADMIN"]),fetchCoursesByTeacher);
export default router;