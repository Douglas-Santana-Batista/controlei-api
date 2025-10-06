/*
  Warnings:

  - You are about to drop the column `id_user` on the `Installment` table. All the data in the column will be lost.
  - Added the required column `publicId` to the `Installment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Installment" DROP CONSTRAINT "Installment_id_user_fkey";

-- DropIndex
DROP INDEX "public"."idx_installment_user";

-- AlterTable
ALTER TABLE "public"."Installment" DROP COLUMN "id_user",
ADD COLUMN     "publicId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "idx_installment_user" ON "public"."Installment"("publicId");

-- AddForeignKey
ALTER TABLE "public"."Installment" ADD CONSTRAINT "Installment_publicId_fkey" FOREIGN KEY ("publicId") REFERENCES "public"."User"("publicId") ON DELETE CASCADE ON UPDATE CASCADE;
