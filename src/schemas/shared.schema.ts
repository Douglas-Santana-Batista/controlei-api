import z from "zod";

export const idSchema = z.coerce.number().int().positive();
export const stringSchema = z.string({required_error: "is mandatory"}).min(1,"must be at least 1 characters long").trim()