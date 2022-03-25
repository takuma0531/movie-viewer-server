import { UserController } from "../controllers/UserController";
import { UserService } from "../services/user/UserService";
import { UserRepository } from "../db/repositories/user/UserRepository";
// user model to be added TODO:

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
export const userController = new UserController(userService);
