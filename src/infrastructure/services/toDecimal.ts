import { Prisma } from "@prisma/client";

export function toDecimal(numero: number) {
  const newDecimal = new Prisma.Decimal(numero);
  return newDecimal;
}
