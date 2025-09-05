/*
  Warnings:

  - The values [CREDITO,DEBITO] on the enum `PaymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PaymentType_new" AS ENUM ('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BOLETO', 'PIX');
ALTER TABLE "public"."Subcategory" ALTER COLUMN "payment_type" DROP DEFAULT;
ALTER TABLE "public"."Subcategory" ALTER COLUMN "payment_type" TYPE "public"."PaymentType_new" USING ("payment_type"::text::"public"."PaymentType_new");
ALTER TYPE "public"."PaymentType" RENAME TO "PaymentType_old";
ALTER TYPE "public"."PaymentType_new" RENAME TO "PaymentType";
DROP TYPE "public"."PaymentType_old";
ALTER TABLE "public"."Subcategory" ALTER COLUMN "payment_type" SET DEFAULT 'DEBIT_CARD';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Subcategory" ALTER COLUMN "payment_type" SET DEFAULT 'DEBIT_CARD';
