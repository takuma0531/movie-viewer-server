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
import { BcryptService } from "../crypto/BcryptService";
import { User } from "../../db/models/user/user.model";
import { JwtConstants } from "../../config/constants";

export class UserService implements IUserService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _tokenService: ITokenService
  ) {}

  public async getAllUsers(): Promise<UserReadDto[]> {
    try {
      const userReadDtos = await this._userRepository.getAll();
      return userReadDtos;
    } catch (err: any) {
      throw err;
    }
  }

  public async getUsersByName(name: string): Promise<UserReadDto[] | null> {
    try {
      const userReadDtos = await this._userRepository.getSomeByName(name);
      return userReadDtos;
    } catch (err: any) {
      throw err;
    }
  }

  public async getUserById(id: string): Promise<UserReadDto | null> {
    try {
      const userReadDto = await this._userRepository.getById(id);
      return userReadDto;
    } catch (err: any) {
      throw err;
    }
  }

  public async getUserByEmail(email: string): Promise<UserReadDto | null> {
    try {
      const userReadDto = await this._userRepository.getByEmail(email);
      return userReadDto;
    } catch (err: any) {
      throw err;
    }
  }

  public async createUser(
    userCreateDto: UserCreateDto
  ): Promise<UserReadDto | null> {
    try {
      userCreateDto.password = await BcryptService.encrypt(
        userCreateDto.password
      );
      const userDocumentToAdd = User.toDocument(userCreateDto);
      const userDocument = await this._userRepository.add(userDocumentToAdd);

      const payload = {
        id: userDocument._id,
        email: userDocument.email,
        role: userDocument.role,
      };
      const userReadDto = userDocument.toReadDto();

      const token = this._tokenService.generateJwt(payload);
      const auth: AuthorizedResult = {
        token,
        expireIn: JwtConstants.JWT_EXPIRE_IN,
        isAuthorized: true,
      };
      userReadDto.authResult = auth;

      return userReadDto;
    } catch (err: any) {
      throw err;
    }
  }

  public async updateUser(
    userUpdateDto: UserUpdateDto
  ): Promise<UserReadDto | null> {
    try {
      const userDocument = await this._userRepository.updateById(
        userUpdateDto.id!,
        userUpdateDto
      );
      return userDocument;
    } catch (err: any) {
      throw err;
    }
  }

  public async loginUser(
    userLoginRequestDto: UserLoginRequestDto
  ): Promise<AuthorizedResult> {
    try {
      const authorizedResult = this.returnInitialAuthorizedResult();

      const userDocument = await this._userRepository.getByEmail(
        userLoginRequestDto.email
      );
      if (!userDocument) return authorizedResult;

      const isPaswordMatched = await BcryptService.compare(
        userLoginRequestDto.password,
        userDocument.password
      );
      if (!isPaswordMatched) return authorizedResult;

      const payload = {
        id: userDocument._id,
        email: userDocument.email,
        role: userDocument.role,
      };
      const token = this._tokenService.generateJwt(payload);

      authorizedResult.token = token;
      authorizedResult.expireIn = JwtConstants.JWT_EXPIRE_IN;
      authorizedResult.isAuthorized = true;
      return authorizedResult;
    } catch (err: any) {
      throw err;
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      await this._userRepository.removeById(id);
    } catch (err: any) {
      throw err;
    }
  }

  public async getAuthResult(
    payload: CustomJwtPayload
  ): Promise<AuthorizedResult> {
    try {
      const authorizedResult = this.returnInitialAuthorizedResult();
      const token = this._tokenService.generateJwt(payload);
      authorizedResult.token = token;
      authorizedResult.expireIn = JwtConstants.JWT_EXPIRE_IN;
      authorizedResult.isAuthorized = true;
      return authorizedResult;
    } catch (err: any) {
      throw err;
    }
  }

  private returnInitialAuthorizedResult(): AuthorizedResult {
    return {
      token: null,
      expireIn: null,
      isAuthorized: false,
    };
  }
}
