/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ALTER COLUMN "regno" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("regno");
