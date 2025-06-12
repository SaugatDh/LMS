import express from 'express';
// This one is for checking if the user is logged in or not
import { authenticateUser } from '../middlewares/authentication/auth.middleware.js';
//This one is for checking if the user has the right role to access the route
import { isAuthenticated } from '../middlewares/authentication/role.middleware.js';

import { updateRole,removeUser,removeCourse} from '../controllers/admin/admin.controller.js';

const router=express.Router();

// Routes for admin management
router.route('/update-role/:user_id').patch(authenticateUser,isAuthenticated(['ADMIN']),updateRole);
router.route('/remove-user/:user_id').delete(authenticateUser,isAuthenticated(['ADMIN']),removeUser);
router.route('/remove-course/:course_id').delete(authenticateUser,isAuthenticated(['ADMIN',"TEACHER"]),removeCourse);
export default router;