/*
  Warnings:

  - Added the required column `group_public_id` to the `Installment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Installment" ADD COLUMN     "group_public_id" TEXT NOT NULL;
