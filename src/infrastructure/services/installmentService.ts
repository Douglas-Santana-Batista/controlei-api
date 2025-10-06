import { Prisma } from "@prisma/client";
import { Installment } from "src/domain/entities/Installment";

function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);

  // Ajuste para casos onde o dia original não existe no novo mês
  if (newDate.getDate() !== date.getDate()) {
    newDate.setDate(0); // Vai para o último dia do mês anterior
  }

  return newDate;
}

export function prepareData(data: Installment, publicId: string, id_subcategory: number) {
  const totalAmount = new Prisma.Decimal(data.amount);
  const installmentValue = totalAmount.dividedBy(data.number).toDecimalPlaces(2);
  const lastInstallmentAdjustment = totalAmount.minus(installmentValue.times(data.number - 1));

  const installmentsData = Array.from({ length: data.number }, (_, i) => {
    const isLast = i === data.number - 1;
    const parcelValue = isLast ? lastInstallmentAdjustment : installmentValue;
    return {
      createdAt: addMonths(new Date(), i),
      due_date: addMonths(new Date(), i),
      amount: parcelValue,
      number: i + 1,
      status: data.status,
      publicId: publicId,
      id_subcategory: id_subcategory,
    };
  });

  return installmentsData;
}
