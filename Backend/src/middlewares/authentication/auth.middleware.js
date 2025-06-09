import jwt from "jsonwebtoken";
import asyncHandler from "../../helpers/asyncHandler.js";
import generateToken from "../../utils/generateToken.js";
import prisma from "../../lib/dbConnection.js";
// Middleware to check if the user is logged in
const authenticateUser = asyncHandler(async (req, res, next) => {
  const access_token = req?.cookies?.access_token?.split(" ")[1];
  const refresh_token = req?.cookies?.refresh_token?.split(" ")[1];

  if (access_token) {
    let decoded;
    try {
      decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      throw new Error("Invalid access token");
    }

    const user = await prisma.user.findUnique({ where: { email: decoded.email } });
    if (!user) throw new Error("User not found");
    req.loggedInfo = { id: user.id, email: user.email, role: user.role };
    return next();
  }

  if (refresh_token) {
    let decoded;
    try {
      decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      throw new Error("Invalid refresh token");
    }

    const user = await prisma.user.findUnique({ where: { email: decoded.email } });
    if (!user) throw new Error("User not found");

    const newAccessToken = generateToken(
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      { id: user.id, email: user.email }
    );

    res.cookie("access_token", `Bearer ${newAccessToken}`, {
      maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRATION_TIME),
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
    });

    req.loggedInfo = { id: user.id, email: user.email, role: user.role };
    return next();
  }

  res.status(401).json({ status: 401, message: "Please log in to access this service!" });
});

export { authenticateUser };
