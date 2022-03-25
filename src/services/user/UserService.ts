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

  public async getAllUsers(): Promise<object[]> {
    return await [
      { id: "1", email: "test1@email.com" },
      { id: "2", email: "test2@email.com" },
    ];
  }

  public async getUsersByName(name: string): Promise<object[]> {
    return await [
      { id: "1", email: "test1@email.com" },
      { id: "2", email: "test2@email.com" },
    ];
  }

  public async getUserById(id: string): Promise<object> {
    return await { id: "1", email: "test1@email.com" };
  }

  public async createUser(userCreateDto: object): Promise<object> {
    return await userCreateDto;
  }

  public async updateUser(userUpdateDto: object): Promise<object> {
    return await userUpdateDto;
  }

  public async loginUser(userLoginRequestDto: object): Promise<object> {
    return await {};
  }

  public async deleteUser(id: string): Promise<void> {}

  public async getAuthResult(payload: object): Promise<object> {
    return await {};
  }
}
