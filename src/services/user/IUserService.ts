import {
  AuthorizedResult,
  UserCreateDto,
  UserLoginRequestDto,
  UserReadDto,
  UserUpdateDto,
} from "../../typings/model/user/dto";
import { CustomJwtPayload } from "../../typings/common/jwt";

export interface IUserService {
  getAllUsers(): Promise<UserReadDto[]>;
  getUsersByName(name: string): Promise<UserReadDto[]>;
  getUserById(id: string): Promise<UserReadDto | null>;
  createUser(userCreateDto: UserCreateDto): Promise<UserReadDto>;
  updateUser(userUpdateDto: UserUpdateDto): Promise<UserReadDto>;
  loginUser(
    userLoginRequestDto: UserLoginRequestDto
  ): Promise<AuthorizedResult>;
  deleteUser(id: string): Promise<void>;
  getAuthResult(payload: CustomJwtPayload): Promise<AuthorizedResult>;
}
