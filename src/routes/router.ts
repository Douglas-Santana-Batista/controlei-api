import { Router } from "express";
import { createUser, deleteUserByid, getUser, updateUser } from "../controller/userController";
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "../controller/categoryController";
import { createsubCategory, deletesubCategory, getAllsubCategory, getSubcategory, updatesubCategory } from "../controller/subCategoryController";
import { createInstallments, deleteInstallment, getallInstallment, getinstallment, updateInstallments } from "../controller/installmentsController";

export const router = Router();

//users routes
router.post("/users", createUser)
router.get("/getUsers/:id_user", getUser)
router.delete("/deleteUser/:id_user", deleteUserByid)
router.put("/updateUser/:id_user", updateUser)

//category routes
router.post("/createCategory/:id_user", createCategory)
router.put("/updateCategory/:id_user/:id_category",updateCategory)
router.get("/getAllCategory/:id_user", getAllCategory)
router.get("/getCategory/:id_user/:id_category", getCategory)
router.delete("/deleteCategory/:id_category",deleteCategory)

//subCategory routes
router.post("/createSubCategory/:id_user/:id_category", createsubCategory)
router.get("/getAllsubCategory/:id_user/:id_category", getAllsubCategory)
router.delete("/deletesubCategory/:id_user/:id_category/:id_subcategory", deletesubCategory)
router.put("/updatesubCategory/:id_user/:id_category/:id_subcategory", updatesubCategory)
router.get("/getSubcategory/:id_user/:id_category/:id_subcategory", getSubcategory)

//installments routes
router.post("/createInstallments/:id_user/:id_subcategory", createInstallments)
router.put("/updateInstallments/:id_user/:id_installment", updateInstallments)
router.delete("/deleteInstallment/:id_user/:id_installment", deleteInstallment)
router.get("/getallInstallment/:id_user/:id_subcategory", getallInstallment)
router.get("/getinstallment/:id_user/:id_instalment", getinstallment)