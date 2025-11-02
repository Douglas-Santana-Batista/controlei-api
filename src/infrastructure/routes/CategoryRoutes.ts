import { Router } from "express";
import { CategoryRepository } from "../repositories/CategoryReapository";
import prisma from "../database/prisma";
import { CreateCategoryCase } from "src/application/useCases/category/createCategoryCase";
import { CategoryController } from "../controllers/CategoryController";
import { UpdateCategoryCase } from "src/application/useCases/category/UpdateCategoryCase";
import { FindCategoryCase } from "src/application/useCases/category/FindCategoryCase";
import { FindAllPaginatedCategoryCase } from "src/application/useCases/category/FindAllCategoryPaginedCase";
import { DeleteCategoryCases } from "src/application/useCases/category/DeleteCategoryCases";
import { CategoryRepositoryInterface } from "src/domain/interfaces/CategoryRepositoryInterface";
import { findUser } from "./UserRoutes";
import { authorizeUser } from "../middlewares/authorizationMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

export const router = Router();

const categoryRepository: CategoryRepositoryInterface = new CategoryRepository(prisma);

const createCategory = new CreateCategoryCase(categoryRepository, findUser);
const updateCategory = new UpdateCategoryCase(categoryRepository);
const findCategory = new FindCategoryCase(categoryRepository);
const findAllCategory = new FindAllPaginatedCategoryCase(categoryRepository);
const deleteCategory = new DeleteCategoryCases(categoryRepository);

const categoryController = new CategoryController(createCategory, findCategory, updateCategory, deleteCategory, findAllCategory);

router.post("/createCategory/:publicId", authMiddleware, authorizeUser, categoryController.create.bind(categoryController));
router.get("/findCategory/:id_category/:publicId", authMiddleware, authorizeUser, categoryController.find.bind(categoryController));
router.get("/findAllCategory/:publicId", authMiddleware, authorizeUser, categoryController.findAll.bind(categoryController));
router.get("/findAllCategoryPaigined/:page/:limit/:publicId", authMiddleware, authorizeUser, categoryController.findAllPaginated.bind(categoryController));
router.put("/updateCategory/:id_category/:publicId", authMiddleware, authorizeUser, categoryController.update.bind(categoryController));
router.delete("/deleteCategory/:id_category/:publicId", authMiddleware, authorizeUser, categoryController.delete.bind(categoryController));
