import { Router } from "express";
import { SubcategoryRepositoryInterface } from "src/domain/interfaces/SubcategoryRepositoryInterface";
import prisma from "../database/prisma";
import { SubCategoryRepository } from "../repositories/SubCategoryRepository";
import { FindSubCategoryCase } from "src/application/useCases/subCategory/FindSubcategoryCase";
import { CreateSubCategoryCase } from "src/application/useCases/subCategory/CreateSubCategoryCase";
import { UpdateSubCategoryUseCase } from "src/application/useCases/subCategory/UpdateSubCategoryUseCase";
import { DeleteSubCategoryCase } from "src/application/useCases/subCategory/DeleteSubCategoryCase";
import { SubCategoryController } from "../controllers/SubCategoryController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeUser } from "../middlewares/authorizationMiddleware";

export const router = Router();

const subcategoryRepository: SubcategoryRepositoryInterface = new SubCategoryRepository(prisma);

const findAllSubcategory = new FindSubCategoryCase(subcategoryRepository);
const createSubCategory = new CreateSubCategoryCase(subcategoryRepository);
const updateSubCategory = new UpdateSubCategoryUseCase(subcategoryRepository);
const deleteSubcategory = new DeleteSubCategoryCase(subcategoryRepository);

const subCategoryController = new SubCategoryController(createSubCategory, findAllSubcategory, updateSubCategory);

router.post("/createSubcategory/:id_category/:publicId", authMiddleware, authorizeUser, subCategoryController.create.bind(subCategoryController));
router.get("/getSubCategory/:id_subcategory/:publicId", authMiddleware, authorizeUser, subCategoryController.findById.bind(subCategoryController));
router.get("/findAllSubcategory/:publicId", authMiddleware, authorizeUser, subCategoryController.findAll.bind(subCategoryController));
router.put("/updateSubcategory/:id_subcategory/:publicId", authMiddleware, authorizeUser, subCategoryController.update.bind(subCategoryController));
