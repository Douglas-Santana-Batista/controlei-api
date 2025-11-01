import { Router } from "express";
import { SubcategoryRepositoryInterface } from "src/domain/interfaces/SubcategoryRepositoryInterface";
import prisma from "../database/prisma";
import { SubCategoryRepository } from "../repositories/SubCategoryRepository";
import { FindSubCategoryCase } from "src/application/useCases/subCategory/FindSubcategoryCase";
import { CreateSubCategoryCase } from "src/application/useCases/subCategory/CreateSubCategoryCase";
import { UpdateSubCategoryUseCase } from "src/application/useCases/subCategory/UpdateSubCategoryUseCase";
import { DeleteSubCategoryCase } from "src/application/useCases/subCategory/DeleteSubCategoryCase";

export const router = Router();

const subcategoryRepository: SubcategoryRepositoryInterface = new SubCategoryRepository(prisma);

const findAllSubcategory = new FindSubCategoryCase(subcategoryRepository);
const createSubCategory = new CreateSubCategoryCase(subcategoryRepository);
const updateSubCategory = new UpdateSubCategoryUseCase(subcategoryRepository);
const deleteSubcategory = new DeleteSubCategoryCase(subcategoryRepository);
