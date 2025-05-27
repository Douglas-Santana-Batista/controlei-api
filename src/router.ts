import { Router } from "express";
import { createUser, deleteUserByid, getallUser, deleteAllUsers } from "./controller/userController";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "./controller/categoriaController";
import { createsubCategory, deletesubCategory, getAllsubCategory, updatesubCategory } from "./controller/subCategoryController";
import { createExpense, getAllExpense } from "./controller/despesasController";


export const router = Router();

//users routes
router.post("/user", createUser)
router.get("/get", getallUser)
router.delete("/delete/:id_usuario", deleteUserByid)
router.delete("/delete", deleteAllUsers)

//category routes
router.post("/createCategory/:id_usuario", createCategory)
router.put("/updateCategory/:id_usuario/:id_categoria",updateCategory)
router.get("/getAllCategory", getAllCategory)
router.delete("/deleteCategory/:id_categoria",deleteCategory)

//subCategory routes
router.post("/createSubCategory/:id_usuario/:id_categoria", createsubCategory)
router.get("/getAllsubCategory", getAllsubCategory)
router.delete("/deletesubCategory/:id_usuario/:id_subcategoria", deletesubCategory)
router.put("/updatesubCategory/:id_usuario/:id_subcategoria", updatesubCategory)

//expense routers
router.post("/createExpense/:id_usuario/:id_categoria", createExpense)
router.post("/getAllExpense", getAllExpense)