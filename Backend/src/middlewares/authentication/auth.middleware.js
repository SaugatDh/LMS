import jwt from "jsonwebtoken";
import ErrorConfig from "../../helpers/errorConfig";
import asyncHandler from "../../helpers/asyncHandler";
import { User } from "../../entities/user.entity";
import generateToken from "../../utils/generateToken";

const isLoggedIn = asyncHandler(async (req, res, next) => {
  const access_token = req?.cookies?.access_token?.split(" ")[1];
  const refresh_token = req?.cookies?.refresh_token?.split(" ")[1];
  if (!access_token && !refresh_token) {
    throw new ErrorConfig(401, "please logged in to access this service !!");
  }
  if (!access_token && refresh_token) {
    console.log("refresh token available & access_token unavailable");
    let verifyRefreshToken = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (verifyRefreshToken) {
      let findUserByToken = await User.findOne({ where: { refresh_token } });
      if (!findUserByToken) throw new ErrorConfig(401, "unauthorized access");
      let payload = { email: findUserByToken.email };
      let access_token_secret = process.env.ACCESS_TOKEN_SECRET;
      let access_token_expiration_time = Number(
        process.env.ACCESS_TOKEN_EXPIRATION_TIME
      );
      let access_token_cookie_expiration_time = Number(
        process.env.ACCESS_TOKEN_COOKIE_EXPIRATION_TIME
      );
      let access_token = await generateToken(
        access_token_secret,
        access_token_expiration_time,
        payload
      );
      res.cookie("access_token", `Bearer ${access_token}`, {
        maxAge: access_token_cookie_expiration_time,
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
      });
      req.email = payload?.email;
      next();
    } else {
      throw new ErrorConfig(401, "unauthorized access");
    }
  }
  if (access_token) {
    console.log("refresh_token available & access_token available");
    let verifyAccessToken = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (verifyAccessToken && typeof verifyAccessToken !== "string") {
      req.email = verifyAccessToken.email;
      next();
    } else {
      throw new ErrorConfig(401, "unauthorized access");
    }
  }
});

export { isLoggedIn };
