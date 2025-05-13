import { z } from 'zod'

export const subCategorySchema = z.object({
    descricao_subcategoria:z.string({
        required_error: "description is mandatory"
    })
    .min(2,"Subcategory must be at least 2 characters long")
    .trim()
    .toLowerCase(),
})
export const subcategoryIdParamsSchema = z.object({
    id_usuario: z.string().regex(/^\d+$/, "ID must be a number")
});