/*
  Warnings:

  - You are about to drop the column `credits` on the `Course` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "credits",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "otp" DROP NOT NULL,
ALTER COLUMN "otpExpiresAt" DROP NOT NULL;
