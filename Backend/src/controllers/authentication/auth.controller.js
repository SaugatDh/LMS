import bcrypt from "bcryptjs";
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';
import ejs from "ejs";
import { userFields } from "../../utils/schemaFields.js";

import asyncHandler from "../../helpers/asyncHandler.js";
import ErrorConfig from "../../helpers/errorConfig.js";
import ResponseConfig from "../../helpers/responseConfig.js";
import generateToken from "../../utils/generateToken.js";
import generateOtp from "../../utils/generateOTP.js";
import generateOtpExpirationTime from "../../utils/generateOtpExpirationTime.js";
import uploadImageIntoCloudinary from "../../services/coudinary.js";
import sendEmail from "../../services/gmail.js";
import hashedData from "../../utils/generateHash.js";
import prisma from "../../lib/dbConnection.js";
import compareArray from "../../utils/compareArray.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const test = asyncHandler(async (req, res, next) => {
  let bool = true;
  if (bool) {
    let response = new ResponseConfig(200, "this is test message");
    return res.json(response);
  }
  next(new ErrorConfig(401, "You are not authenticate"));
  // next(new Error())
});

const userRegistration = asyncHandler(async (req, res, next) => {
 const isValid=compareArray(userFields, Object.keys(req.body));
  if(!isValid) return next(new ErrorConfig(400,"Invalid fields"));
  let userData = req.body;
  console.log({userData});
  let userDataValues = Object.values(userData);
  let uploadProfile;
  let inserData;
  let profileImage = req.file;
  //delete role for security purpose
  delete userData?.role;
  if (profileImage) {
    uploadProfile = await uploadImageIntoCloudinary(profileImage?.path, "authentication/profile");
    console.log({ profileImage });
  }
  if (Object.keys(userData).includes("profile") && !profileImage) {
    delete userData?.profile;
  }
  if (userDataValues.some(value => (value === null || value === undefined || value === " "))) {
    return next(new ErrorConfig(400, "All fields are required"));
  }
  let userExist = await prisma.user.findUnique({where:{email:userData.email}});
  if (userExist) {
    console.log({ userExist });
    return next(new ErrorConfig(400, "user already exist"));
  }
  let refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;
  let refresh_token_expiration_time = process.env.REFRESH_TOKEN_EXPIRATION_TIME;
  let access_token_secret = process.env.ACCESS_TOKEN_SECRET;
  let access_token_expiration_time = process.env.ACCESS_TOKEN_EXPIRATION_TIME;
  let access_token_cookie_expiration_time = Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRATION_TIME);
  let refresh_token_cookie_expiration_time = Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRATION_TIME);
  let payload = { email: userData?.email, password: userData?.password };
  let refresh_token = generateToken(refresh_token_secret, refresh_token_expiration_time, payload);
 
  //generate otp
  let otp = generateOtp();
  let hashedOTP = await hashedData(otp, 10);
  let otpExpiresAt = generateOtpExpirationTime();

  //generate hashed password
  const hashedPassword = await hashedData(userData.password, 10);
  userData.password = hashedPassword;
  console.log({ otp, otpExpiresAt });
  if (req.file && uploadProfile) {
    inserData = await prisma.user.create({
      data:{
      ...userData,
      profile: uploadProfile?.url || null,
       refreshToken:refresh_token,
      otp: hashedOTP,
      otpExpiresAt
      }
    });
  } else {
    inserData = await prisma.user.create({
      data:{
      ...userData,
      refreshToken:refresh_token,
      otp: hashedOTP,
      otpExpiresAt
      }
    });
  }
  if (inserData) {
    let templatePath = path.join(__dirname, "../../views/verificationEmailTemplate.ejs");
    let data = {
      user: userData.first_name,
      otpCode: otp
    };
    ejs.renderFile(templatePath, { data }, async function (err, htmlTemplate) {
      if (err) {
        console.log({ error: err });
        throw new Error();
      }
      await sendEmail("Verification Email", "Verification Email", userData.email, htmlTemplate);
    });
     let access_token = generateToken(access_token_secret, access_token_expiration_time, payload);
    res.cookie("access_token", `Bearer ${access_token}`, {
      maxAge: access_token_cookie_expiration_time,
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production"
    });
    res.cookie("refresh_token", `Bearer ${refresh_token}`, {
      maxAge: refresh_token_cookie_expiration_time,
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true
    });
    return res.status(201).json(new ResponseConfig(201, "Welcome,Your account has been created."));
  }
  next(new ErrorConfig(400, "Failed to create account"));
});

const login = asyncHandler(async (req, res, next) => {
  let userData = req.body;
  let userDataValues = Object.values(userData);
  console.log({ userData, userDataValues });
  if (userDataValues.some(value => (value === undefined || value === null || value === " "))) {
    return next(new ErrorConfig(400, "All fields are required"));
  }
  let { email, password } = userData;
  let verifyEmail = await prisma.user.findUnique({ where: { email } });
  console.log({verifyEmail})
  if (verifyEmail?.isVerified === false) return next(new ErrorConfig(400, "please verify your account"));
  if (!verifyEmail) return next(new ErrorConfig(400, "Email or password doesn't match !!"));
  if (verifyEmail) {
    let verifyPassword = await bcrypt.compare(password, verifyEmail.password);
    if (!verifyPassword) return next(new ErrorConfig(400, "Email or password doesn't match !!"));
    let refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;
    let refresh_token_expiration_time = process.env.REFRESH_TOKEN_EXPIRATION_TIME;
    let refresh_token_cookie_expiration_time = Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRATION_TIME);
    let access_token_secret = process.env.ACCESS_TOKEN_SECRET;
    let access_token_expiration_time = process.env.ACCESS_TOKEN_EXPIRATION_TIME;
    let access_token_cookie_expiration_time = Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRATION_TIME);
    let payload = { email: userData.email, password: userData.password };
    let refresh_token =  generateToken(refresh_token_secret, refresh_token_expiration_time, userData);
    let access_token = generateToken(access_token_secret, access_token_expiration_time, payload);
    res.cookie("access_token", `Bearer ${access_token}`, {
      maxAge: access_token_cookie_expiration_time,
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production"
    });
    res.cookie("refresh_token", `Bearer ${refresh_token}`, {
      maxAge: refresh_token_cookie_expiration_time,
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true
    });
    return res.status(200).json(new ResponseConfig(200, "Welcome,logged in successfully."));
  }
  next(new ErrorConfig(400, "Failed to logged in!!"));
});

const loggedOut = asyncHandler(async (req, res, next) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.json(new ResponseConfig(200, "user logged out"));
});


const verifyOtp = asyncHandler(async (req, res, next) => {
  let { email } = req.body;
  let findUser = await prisma.user.findUnique({ where: { email } });
  if (!findUser) return next(new ErrorConfig(401, "unauthorized access"));
  let verifyOtpCode = await bcrypt.compare(req.params.otpCode, findUser.otp);
  if (!verifyOtpCode || !findUser.otp_expires_at) return next(new ErrorConfig(401, "Invalid code"));
  let isOtpValid = new Date() < findUser.otp_expires_at;
  console.log({ now: new Date(), otpExpires: findUser.otp_expires_at });
  if (!isOtpValid) return next(new ErrorConfig(401, "OTP expires"));
  let verifyAccount = await prisma.user.update({
    where: { otp: req.params.otpCode },
    data: { otp: undefined, otp_expires_at: undefined, is_verified: true }
    });
  if (verifyAccount) {
    let templatePath = path.join(__dirname, "../../../views/welcomeEmailTemplate.ejs");
    let data = {
      user: findUser.firstName //findOtp contain user data
    };
    ejs.renderFile(templatePath, { data }, async function (err, htmlTemplate) {
      if (err) {
        console.log({ error: err });
        throw new Error();
      }
      await sendEmail("Verification Email", "Verification Email", findUser.email, htmlTemplate);
    });
  }
});

const sendOtpAgain = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const userExist = await prisma.user.findUnique({ where: { email, is_verified: false } });
  if (!userExist) return next(new ErrorConfig(400, "Sorry you can't use this service"));
  let otp = generateOtp();
  let hashedOTP = await hashedData(otp, 10);
  let otpExpiresAt = generateOtpExpirationTime();
  console.log({ hashedOTP, otpExpiresAt });
  const updateOtp = await prisma.user.update({
      where:{email} ,
      data:{
      otp: hashedOTP,
      otpExpiresAt
      }
    });
  if (!updateOtp) return next(new ErrorConfig(500, "failed to update OTP"));
  console.log({ updateOtp });
  let templatePath = path.join(__dirname, "../../../views/verificationEmailTemplate.ejs");
  let data = {
    user: userExist.first_name, //userExist contain user data
    otpCode: otp
  };
  ejs.renderFile(templatePath, { data }, async function (err, htmlTemplate) {
    if (err) {
      console.log({ error: err });
      throw new Error();
    }
    await sendEmail("Verification Email", "Verification Email", email, htmlTemplate);
  });
  res.json(new ResponseConfig(200, "OTP sent"));
});

export {
  test,
  userRegistration,
  login,
  loggedOut,
  verifyOtp,
  sendOtpAgain
};
