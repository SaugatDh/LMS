import asyncHandler from "../../helpers/asyncHandler.js";
import hashedData from "../../utils/generateHash.js";
import ResponseConfig  from "../../helpers/responseConfig.js";
import ErrorConfig from "../../helpers/errorConfig.js";
import prisma from "../../lib/dbConnection.js";
// get all users
const getUsers = asyncHandler(async (req, res, next) => {
  let users = await prisma.student.findMany();
  if(users.length<=0) return next(new ErrorConfig(404,"users not found"));
  return res.status(200).json(new ResponseConfig(200, null, getUsers));
});


const updateProfile = asyncHandler(async (req, res, next) => {
  let email = req.email;
  let updateId = req.params.id;
  let updatePayload = req.body;
  const isUserExist = await prisma.student.findUnique({ where: { email } });
  if (!isUserExist) return next(new ErrorConfig(401, "unauthorized access !!"));
  if (updatePayload.password) {
    const hashedPassword = await hashedData(updatePayload.password, 10);
    updatePayload.password = hashedPassword;
  }
  let updateUser = await prisma.student.update(updateId, updatePayload);
  if (updateUser) return res.status(202).json(new ResponseConfig(202, "updated successfully"));
  next(new ErrorConfig(500, "failed to update profile !!"));
});

export { getUsers, updateProfile};