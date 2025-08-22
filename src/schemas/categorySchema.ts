import { z } from "zod";
import { idSchema, MonetaryValueSchema } from "./shared.schema";

const categoriaBodySchema = z.object({
  description: z
    .string({
      required_error: "description is mandatory",
    })
    .trim()
    .toLowerCase(),
  budget: MonetaryValueSchema.optional(),
});

export const categorybodySchema = categoriaBodySchema;

export const IdupdatecategoryParamsSchema = z.object({
  id_user: idSchema,
  id_category: idSchema,
});

export const IdDeletecategoryParamsSchema = z.object({
  id_category: idSchema,
});

export const IdcategoryParamsSchema = z.object({
  id_user: idSchema,
});
