import { UserController } from "../controllers/UserController";
import { UserService } from "../services/user/UserService";

const userService = new UserService();
export const userController = new UserController(userService);
