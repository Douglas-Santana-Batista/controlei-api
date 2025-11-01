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

export const router = Router();

const categoryRepository: CategoryRepositoryInterface = new CategoryRepository(prisma);

const createCategory = new CreateCategoryCase(categoryRepository, findUser);
const updateCategory = new UpdateCategoryCase(categoryRepository);
const findCategory = new FindCategoryCase(categoryRepository);
const findAllCategory = new FindAllPaginatedCategoryCase(categoryRepository);
const deleteCategory = new DeleteCategoryCases(categoryRepository);

const categoryController = new CategoryController(createCategory, findCategory, updateCategory, deleteCategory, findAllCategory);

router.post("/createCategory/:publicId", (req, res, next) => categoryController.create(req, res, next));
router.get("/findCategory/:id_category/:publicId", (req, res, next) => categoryController.find(req, res, next));
router.get("/findAllCategory/:publicId", (req, res, next) => categoryController.findAll(req, res, next));
router.get("/findAllCategoryPaigined/:page/:limit/:publicId", (req, res, next) => categoryController.findAllPaginated(req, res, next));
router.put("/updateCategory/:id_category/:publicId", (req, res, next) => categoryController.update(req, res, next));
router.delete("/deleteCategory/:id_category/:publicId", (req, res, next) => categoryController.delete(req, res, next));
