import { Router } from "express";
import { createUser, deleteUserByid, getallUser, deleteAllUsers } from "./controller/userController";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "./controller/categoriaController";


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