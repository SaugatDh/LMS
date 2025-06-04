import asyncHandler from "../../helpers/asyncHandler.js";
import {hasedData} from "../../utils/generateHash.js";
import { ResponseConfig } from "../../helpers/responseConfig.js";
import ErrorConfig from "../../helpers/errorConfig.js";

// get all users
const getUsers = asyncHandler(async (req, res, next) => {
  let getUsers = await User.find();
  res.json(new ResponseConfig(200, null, getUsers));
});


const updateProfile = asyncHandler(async (req, res, next) => {
  let email = req.email;
  let updateId = req.params.id;
  let updatePayload = req.body;
  const isUserExist = await User.findOne({ where: { email } });
  if (!isUserExist) return next(new ErrorConfig(401, "unauthorized access !!"));
  if (updatePayload.password) {
    const hashedPassword = await hashedData(updatePayload.password, 10);
    updatePayload.password = hashedPassword;
  }
  let updateUser = await User.update(updateId, updatePayload);
  if (updateUser) return res.status(202).json(new ResponseConfig(202, "updated successfully"));
  next(new ErrorConfig(500, "failed to update profile !!"));
});

export { getUsers, updateProfile};