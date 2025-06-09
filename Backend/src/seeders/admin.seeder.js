import prisma from "../lib/dbConnection.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

(async () => {
  try {
    const refreshToken = generateToken(
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXPIRATION_TIME,
      { email: process.env.ADMIN_EMAIL }
    );
    const adminData = {
      firstName: process.env.ADMIN_FIRST_NAME,
      lastName: process.env.ADMIN_LAST_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "ADMIN",
      class: null,
      profile: null,
      refreshToken,
      otp: "",
      otpExpiresAt: new Date(0),
      isVerified: true,
    };

    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    const adminUser = await prisma.user.upsert({
      where: { email: adminData.email },
      update: {},
      create: {
        ...adminData,
        password: hashedPassword,
      },
    });

    if (adminUser) {
      console.log("Admin user created or already exists.");
    } else {
      console.log("Failed to create admin user.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
})();
