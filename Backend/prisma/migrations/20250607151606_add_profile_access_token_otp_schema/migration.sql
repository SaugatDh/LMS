/*
  Warnings:

  - Added the required column `accessToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otpExpiresAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "otp" TEXT NOT NULL,
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "profile" TEXT;
