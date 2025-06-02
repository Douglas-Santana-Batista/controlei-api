import { Router } from "express";
import { createUser, deleteUserByid, getallUser, updateUser } from "../controller/userController";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../controller/categoryController";
import { createsubCategory, deletesubCategory, getAllsubCategory, updatesubCategory } from "../controller/subCategoryController";
import { createExpense, DeleteExpense, getAllExpense, updateExpense } from "../controller/expenseController";
import { createRevenue } from "../controller/revenuesController";


export const router = Router();

//users routes
router.post("/user", createUser)
router.get("/get", getallUser)
router.delete("/delete/:id_user", deleteUserByid)
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
router.put("/updatesubCategory/:id_usuario/:id_subcategories", updatesubCategory)

//expense routers
router.post("/createExpense/:id_user/:id_category/:id_subcategories", createExpense)
router.get("/getAllExpense", getAllExpense)
router.delete("/DeleteExpense/:id_expense", DeleteExpense)
router.put("/updateExpense/:id_expense", updateExpense)

//revenues router
router.post("/createRevenue/:id_user/:id_category/:id_subcategories", createRevenue)