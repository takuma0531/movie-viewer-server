import {
  AuthorizedResult,
  UserCreateDto,
  UserLoginRequestDto,
  UserReadDto,
  UserUpdateDto,
} from "../../typings/model/user/dto";
import { CustomJwtPayload } from "../../typings/common/jwt";

export interface IUserService {
  getAllUsers(): Promise<object[]>;
  getUsersByName(name: string): Promise<object[]>;
  getUserById(id: string): Promise<object>;
  createUser(userCreateDto: object): Promise<object>;
  updateUser(userUpdateDto: object): Promise<object>;
  loginUser(
    userLoginRequestDto: object
  ): Promise<object>;
  deleteUser(id: string): Promise<void>;
  getAuthResult(payload: object): Promise<object>;
}
