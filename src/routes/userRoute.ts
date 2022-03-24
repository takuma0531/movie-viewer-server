import { Request, Response, NextFunction, Router } from "express";
import { userController } from "../dependencyInjection/user";
// authorization as middle
import { use } from "../utils/ErrorHandling";

const router = Router();

router.get("/", use(userController.getAllUsers));

router.get("/search", use(userController.getUsersByName));

router.get("/:id", use(userController.getUserById));

router.post("/", use(userController.createUser));

router.put("/", use(userController.updateUser));

router.post("/login", use(userController.loginUser));

router.delete("/", use(userController.deleteUser));

export { router };
