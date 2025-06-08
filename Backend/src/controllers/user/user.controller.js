import asyncHandler from "../../helpers/asyncHandler.js";
import hashedData from "../../utils/generateHash.js";
import ResponseConfig  from "../../helpers/responseConfig.js";
import ErrorConfig from "../../helpers/errorConfig.js";
import prisma from "../../lib/dbConnection.js";
// get all users
const getUsers = asyncHandler(async (req, res, next) => {
  let users = await prisma.user.findMany();
  if(users.length<=0) return next(new ErrorConfig(404,"users not found"));
  return res.status(200).json(new ResponseConfig(200, null, users));
});


const updateProfile = asyncHandler(async (req, res, next) => {
  let {id} = req.loggedInfo;
  let updatePayload = req.body;
  const isUserExist = await prisma.user.findUnique({ where: { id } });
  if (!isUserExist) return next(new ErrorConfig(401, "unauthorized access !!"));
  if (updatePayload.password) {
    const hashedPassword = await hashedData(updatePayload.password, 10);
    updatePayload.password = hashedPassword;
  }
  let updateUser = await prisma.user.update({
    where:{id},
    data:updatePayload
  });
  if (updateUser) return res.status(202).json(new ResponseConfig(202, "updated successfully",updateUser));
  return next(new ErrorConfig(500, "failed to update profile !!"));
});

export { getUsers, updateProfile};