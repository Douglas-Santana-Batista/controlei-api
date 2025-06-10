-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CREDITO', 'DEBITO', 'BOLETO', 'PIX');

-- CreateEnum
CREATE TYPE "InstallmentStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE');

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "cpf" TEXT,
    "name" TEXT,
    "password" TEXT,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Category" (
    "id_category" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id_subcategory" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id_subcategory")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id_expense" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "payment_type" "PaymentType" NOT NULL DEFAULT 'DEBITO',
    "id_user" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_subcategory" INTEGER,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id_expense")
);

-- CreateTable
CREATE TABLE "Revenue" (
    "id_revenue" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "value" DOUBLE PRECISION NOT NULL,
    "payment_type" "PaymentType" NOT NULL DEFAULT 'DEBITO',
    "installment" INTEGER NOT NULL DEFAULT 1,
    "id_user" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_subcategory" INTEGER,

    CONSTRAINT "Revenue_pkey" PRIMARY KEY ("id_revenue")
);

-- CreateTable
CREATE TABLE "Installment" (
    "id_installment" SERIAL NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "InstallmentStatus" NOT NULL DEFAULT 'PENDING',
    "number" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_revenue" INTEGER,
    "id_expense" INTEGER,

    CONSTRAINT "Installment_pkey" PRIMARY KEY ("id_installment")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "User"("email");

-- CreateIndex
CREATE INDEX "idx_user_cpf" ON "User"("cpf");

-- CreateIndex
CREATE INDEX "idx_expense_user" ON "Expense"("id_user");

-- CreateIndex
CREATE INDEX "idx_expense_date" ON "Expense"("date");

-- CreateIndex
CREATE INDEX "idx_user_date" ON "Expense"("id_user", "date");

-- CreateIndex
CREATE INDEX "idx_payment_type" ON "Expense"("payment_type");

-- CreateIndex
CREATE INDEX "idx_revenue_user" ON "Revenue"("id_user");

-- CreateIndex
CREATE INDEX "idx_revenue_date" ON "Revenue"("date");

-- CreateIndex
CREATE INDEX "idx_revenue_user_date" ON "Revenue"("id_user", "date");

-- CreateIndex
CREATE INDEX "idx_installment_user" ON "Installment"("id_user");

-- CreateIndex
CREATE INDEX "idx_installment_due_date" ON "Installment"("due_date");

-- CreateIndex
CREATE INDEX "idx_installment_expense" ON "Installment"("id_expense");

-- CreateIndex
CREATE INDEX "idx_installment_revenue" ON "Installment"("id_revenue");

-- CreateIndex
CREATE INDEX "idx_installment_status" ON "Installment"("status");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id_category") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id_category") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_id_subcategory_fkey" FOREIGN KEY ("id_subcategory") REFERENCES "Subcategory"("id_subcategory") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id_category") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_id_subcategory_fkey" FOREIGN KEY ("id_subcategory") REFERENCES "Subcategory"("id_subcategory") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_id_revenue_fkey" FOREIGN KEY ("id_revenue") REFERENCES "Revenue"("id_revenue") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_id_expense_fkey" FOREIGN KEY ("id_expense") REFERENCES "Expense"("id_expense") ON DELETE SET NULL ON UPDATE CASCADE;
