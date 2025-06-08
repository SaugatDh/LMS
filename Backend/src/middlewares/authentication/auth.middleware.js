import jwt from "jsonwebtoken";
import asyncHandler from "../../helpers/asyncHandler.js";
import generateToken from "../../utils/generateToken.js";
import prisma from "../../lib/dbConnection.js";
// Middleware to check if the user is logged in
const authenticateUser = asyncHandler(async (req, res, next) => {
  const access_token = req?.cookies?.access_token?.split(" ")[1];
  const refresh_token = req?.cookies?.refresh_token?.split(" ")[1];
  console.log({access_token,refresh_token});
  console.log({cookies:req.cookies})
  if (!access_token && !refresh_token) {
    return res.status(401).json({status:401, message:"please logged in to access this service !"});
  }
  if (!access_token && refresh_token) {
    console.log("refresh token available & access_token unavailable");
    let verifyRefreshToken = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (verifyRefreshToken) {
      let findUser = await prisma.user.findUnique({ where: { refreshToken:refresh_token } });
      if (!findUser)  return res.status(401).json({status:401, message:"unauthorized access !"});
      payload = { id:findUser.id,email: findUser.email };
      console.log({payload});
      let access_token_secret = process.env.ACCESS_TOKEN_SECRET;
      let access_token_expiration_time = process.env.ACCESS_TOKEN_EXPIRATION_TIME;
      let access_token_cookie_expiration_time = Number(
        process.env.ACCESS_TOKEN_COOKIE_EXPIRATION_TIME
      );
      let access_token = generateToken(
        access_token_secret,
        access_token_expiration_time,
        payload
      );
      res.cookie("access_token", `Bearer ${access_token}`, {
        maxAge: access_token_cookie_expiration_time,
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
      });
     req.loggedInfo = { id:findUser.id,email: findUser.email,role: findUser.role };
      next();
    } else {
      return res.status(401).json({status:401, message:"unauthorized access !"}); 
    }
  }
  if (access_token) {
    console.log("refresh_token available & access_token available");
    let verifyAccessToken = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (verifyAccessToken && typeof verifyAccessToken !== "string") {
      let findUser = await prisma.user.findUnique({ where: { refreshToken:refresh_token } });
     req.loggedInfo = { id:findUser.id,email: findUser.email,role: findUser.role };
      next();
    } else {
      return res.status(401).json({status:401, message:"unauthorized access !"});
    }
  }
});

export { authenticateUser };
