import { Router } from "express";
import { createUser, deleteUserByid, getAllUser, getUser, login, updateUser } from "../controller/userController";
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "../controller/categoryController";
import { createsubCategory, deletesubCategory, getAllsubCategory, getSubcategory, updatesubCategory } from "../controller/subCategoryController";
import { createInstallments, deleteInstallment, getallInstallment, getinstallment, updateInstallments } from "../controller/installmentsController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeUser } from "../middlewares/authorizationMiddleware";

export const router = Router();

//users routes
router.get("/getUsers/:id_user",authMiddleware, authorizeUser, getUser)
router.delete("/deleteUser/:id_user",authMiddleware, authorizeUser, deleteUserByid)
router.put("/updateUser/:id_user",authMiddleware, authorizeUser, updateUser)

//category routes
router.post("/createCategory/:id_user",authMiddleware, authorizeUser, createCategory)
router.put("/updateCategory/:id_user/:id_category",authMiddleware, authorizeUser, updateCategory)
router.get("/getAllCategory/:id_user",authMiddleware, authorizeUser, getAllCategory)
router.get("/getCategory/:id_user/:id_category",authMiddleware, authorizeUser, getCategory)
router.delete("/deleteCategory/:id_category",authMiddleware, authorizeUser, deleteCategory)

//subCategory routes
router.post("/createSubCategory/:id_user/:id_category",authMiddleware, authorizeUser, createsubCategory)
router.get("/getAllsubCategory/:id_user/:id_category",authMiddleware, authorizeUser, getAllsubCategory)
router.delete("/deletesubCategory/:id_user/:id_category/:id_subcategory",authMiddleware, authorizeUser, deletesubCategory)
router.put("/updatesubCategory/:id_user/:id_category/:id_subcategory",authMiddleware, authorizeUser, updatesubCategory)
router.get("/getSubcategory/:id_user/:id_category/:id_subcategory",authMiddleware, authorizeUser, getSubcategory)

//installments routes
router.post("/createInstallments/:id_user/:id_subcategory",authMiddleware, authorizeUser, createInstallments)
router.put("/updateInstallments/:id_user/:id_installment",authMiddleware, authorizeUser, updateInstallments)
router.delete("/deleteInstallment/:id_user/:id_installment",authMiddleware, authorizeUser, deleteInstallment)
router.get("/getallInstallment/:id_user/:id_subcategory",authMiddleware, authorizeUser, getallInstallment)
router.get("/getinstallment/:id_user/:id_instalment",authMiddleware, authorizeUser, getinstallment)

//login and register routes
router.get("/login", login)
router.post("/Register", createUser)


//teste
router.get("/getAllUser", getAllUser)