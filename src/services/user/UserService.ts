import { IUserService } from "./IUserService";
import {
  AuthorizedResult,
  UserCreateDto,
  UserLoginRequestDto,
  UserReadDto,
  UserUpdateDto,
} from "../../typings/model/user/dto";
import { CustomJwtPayload } from "../../typings/common/jwt";

export class UserService implements IUserService {
  constructor() {
    // DI of repository and token service
  }

  public async getAllUsers(): Promise<UserReadDto[]> {
    return await [];
  }

  public async getUsersByName(name: string): Promise<UserReadDto[]> {
    return await [];
  }

  public async getUserById(id: string): Promise<UserReadDto | null> {
    return await null;
  }

  public async createUser(userCreateDto: UserCreateDto): Promise<UserReadDto> {
    return await {};
  }

  public async updateUser(userUpdateDto: UserUpdateDto): Promise<UserReadDto> {
    return await {};
  }

  public async loginUser(
    userLoginRequestDto: UserLoginRequestDto
  ): Promise<AuthorizedResult> {
    return await {};
  }

  public async deleteUser(id: string): Promise<void> {}

  public async getAuthResult(
    payload: CustomJwtPayload
  ): Promise<AuthorizedResult> {
    return await {};
  }
}
