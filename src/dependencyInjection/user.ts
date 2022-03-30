import { UserController } from "../controllers/UserController";
import { UserService } from "../services/user/UserService";
import { UserRepository } from "../db/repositories/user/UserRepository";
import { jwtTokenService } from "../services/token/TokenService";
import { User } from "../db/models/user/user.model";

export const userRepository = new UserRepository(User);
export const userService = new UserService(userRepository, jwtTokenService);
export const userController = new UserController(userService);
