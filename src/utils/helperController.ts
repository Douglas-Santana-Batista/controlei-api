import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

// Função para adicionar meses a uma data de forma segura
export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);

  // Ajuste para casos onde o dia original não existe no novo mês
  if (newDate.getDate() !== date.getDate()) {
    newDate.setDate(0); // Vai para o último dia do mês anterior
  }

  return newDate;
}

// Defina a interface
interface InstallmentData {
  due_date: Date;
  amount: Decimal;
  number: number;
  status?: "PENDING" | "PAID" | "OVERDUE" | undefined;
  id_subcategory: number;
  id_user: number;
}

interface InstallmentDataUpdate {
  due_date?: Date | undefined;
  amount?: Decimal | undefined;
  number?: number | undefined;
  status?: "PENDING" | "PAID" | "OVERDUE" | undefined;
  id_subcategory: number;
  id_user: number;
}

export function prepareData(data: InstallmentData) {
  const totalAmount = new Prisma.Decimal(data.amount);
  const installmentValue = totalAmount.dividedBy(data.number).toDecimalPlaces(2);
  const lastInstallmentAdjustment = totalAmount.minus(installmentValue.times(data.number - 1));

  const installmentsData = Array.from({ length: data.number }, (_, i) => {
    const isLast = i === data.number - 1;
    const parcelValue = isLast ? lastInstallmentAdjustment : installmentValue;
    return {
      createdAt: addMonths(new Date(), i),
      amount: parcelValue,
      number: i + 1,
      status: data.status,
      id_user: data.id_user,
      id_subcategory: data.id_subcategory,
    };
  });

  return installmentsData;
}
