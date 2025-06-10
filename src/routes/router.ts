import { Router } from "express";
import { createUser, deleteUserByid, getallUser, updateUser } from "../controller/userController";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../controller/categoryController";
import { createsubCategory, deletesubCategory, getAllsubCategory, updatesubCategory } from "../controller/subCategoryController";
import { createInstallments, updateInstallments } from "../controller/installmentsController";

export const router = Router();

//users routes
router.post("/users", createUser)
router.get("/getUsers", getallUser)
router.delete("/deleteUser/:id_user", deleteUserByid)
router.put("/updateUser/:id_user", updateUser)

//category routes
router.post("/createCategory/:id_user", createCategory)
router.put("/updateCategory/:id_user/:id_category",updateCategory)
router.get("/getAllCategory", getAllCategory)
router.delete("/deleteCategory/:id_category",deleteCategory)

//subCategory routes
router.post("/createSubCategory/:id_user/:id_category", createsubCategory)
router.get("/getAllsubCategory", getAllsubCategory)
router.delete("/deletesubCategory/:id_subcategories", deletesubCategory)
router.put("/updatesubCategory/:id_user/:id_subcategory", updatesubCategory)

//installments routes
router.post("/createInstallments/:id_user", createInstallments)
router.put("/updateInstallments/:id_user/:id_installment", updateInstallments)