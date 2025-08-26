import { z } from "zod";
import { dateSchema, idSchema, MonetaryValueSchema, numberSchema } from "./shared.schema";
import { toUpperCase } from "./shared.schema";

export const installmentsCreateBody = z.object({
  createdAt: dateSchema,
  amount: MonetaryValueSchema,
  number: numberSchema,
  status: z.preprocess(toUpperCase, z.enum(["PENDING", "PAID", "OVERDUE"])).optional(),
});

export const installmentsUpdateBody = z.object({
  due_date: dateSchema.optional(),
  amount: MonetaryValueSchema.optional(),
  number: numberSchema.optional(),
  status: z.preprocess(toUpperCase, z.enum(["PENDING", "PAID", "OVERDUE"])).optional(),
});

export const installmentsCreateParams = z.object({
  id_user: idSchema,
  id_subcategory: idSchema,
});

export const updateInstallmentParams = z.object({
  id_user: idSchema,
  id_subcategory: idSchema,
  id_installment: idSchema,
});

export const getallInstallmentSchema = z.object({
  id_user: idSchema,
});

export const deleteInstallmentParams = z.object({
  id_user: idSchema,
  id_subcategory: idSchema,
});

export const getinstallmentsSchema = z.object({
  id_user: idSchema,
  id_installment: idSchema,
});
