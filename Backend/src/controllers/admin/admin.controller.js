import asyncHandler from "../../helpers/asyncHandler.js";
import ResponseConfig from "../../helpers/responseConfig.js";
import ErrorConfig from "../../helpers/errorConfig.js";
import prisma from "../../lib/dbConnection.js";

// update user role or depending upon condition admin may update others fields as well
const updateRole = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  const { role } = req.body;
  const findUser = await prisma.user.findUnique({ where: { id: user_id } });
  if (!findUser) return next(new ErrorConfig(404, "user not found"));
  const updateUserRole = await prisma.user.update({
    where: { id: user_id },
    data: {
      role,
      otp:null,
      otpExpiresAt: null,
      isVerified: req.body?.isVerified || false,
    },
  });
  if (updateUserRole)
    return res
      .status(200)
      .json(
        new ResponseConfig(200, "role updated successfully",{user:updateUserRole})
      );
      return next(new ErrorConfig(500,"failed to update role !"));
});

//delete user from database
const removeUser=asyncHandler(async (req,res,next)=>{
  const { user_id } = req.params;
  const findUser = await prisma.user.findUnique({ where: { id: user_id } });
  if (!findUser) return next(new ErrorConfig(404, "user not found"));
  const deleteUser=await prisma.user.delete({where:{id: user_id}});
  if(deleteUser) return res.status(200).json(new ResponseConfig(200,"user deleted successfully"));
  return next(new ErrorConfig(500,"failed to delete user !"));
});



//remove course
 
const removeCourse=(async (req,res,next)=>{
    const {course_id}=req.param;
    const course=await prisma.course.findUnique({where:{id:course_id}});
    if (!course) return next(new ErrorConfig(404, "course not found"));
    const removeCourse=await prisma.course.delete({where:{id:course_id}});
    if(removeCourse) return res.status(200).json(new ResponseConfig(200,"course deleted successfully"));
     return next(new ErrorConfig(500,"failed to delete course !"));
});
export { updateRole,removeUser,removeCourse};
