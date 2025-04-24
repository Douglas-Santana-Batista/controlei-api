import { Router } from "express";
import { createUser, deleteUserByid, getallUser, deleteAllUsers } from "./controller/userController";


export const router = Router();

router.post("/user", createUser)
router.get("/get", getallUser)
router.delete("/delete/:id_usuario", deleteUserByid)
router.delete("/delete", deleteAllUsers)