import { IUserService } from "./IUserService";
import {
  AuthorizedResult,
  UserCreateDto,
  UserLoginRequestDto,
  UserReadDto,
  UserUpdateDto,
} from "../../typings/model/user/dto";
import { CustomJwtPayload } from "../../typings/common/jwt";
import { IUserRepository } from "../../db/repositories/user/IUserRepository";
import { ITokenService } from "../token/ITokenService";
import { User } from "../../db/models/user/user.model";

export class UserService implements IUserService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _tokenService: ITokenService
  ) {}

  public async getAllUsers(): Promise<UserReadDto[]> {
    const userReadDtos = await this._userRepository.getAll();
    return userReadDtos;
  }

  public async getUsersByName(name: string): Promise<UserReadDto[] | null> {
    const userReadDtos = await this._userRepository.getSomeByName(name);
    return userReadDtos;
  }

  public async getUserById(id: string): Promise<UserReadDto | null> {
    const userReadDto = await this._userRepository.getById(id);
    return userReadDto;
  }

  public async createUser(
    userCreateDto: UserCreateDto
  ): Promise<UserReadDto | null> {
    // TODO:
    const userDocument = User.toDocument(userCreateDto);
    const userReadDto = await this._userRepository.add(userDocument);
    return userReadDto;
  }

  public async updateUser(
    userUpdateDto: UserUpdateDto
  ): Promise<UserReadDto | null> {
    const userDocument = await this._userRepository.updateById(
      userUpdateDto.id!,
      userUpdateDto
    );
    return userDocument;
  }

  public async loginUser(
    userLoginRequestDto: UserLoginRequestDto
  ): Promise<AuthorizedResult> {
    // TODO:
    return {
      token: null,
      expireIn: null,
      isAuthorized: false,
    };
  }

  public async deleteUser(id: string): Promise<void> {
    await this._userRepository.removeById(id);
  }

  public async getAuthResult(
    payload: CustomJwtPayload
  ): Promise<AuthorizedResult> {
    // TODO:
    return {
      token: null,
      expireIn: null,
      isAuthorized: false,
    };
  }
}
