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
    userCreateDto.password = await BcryptService.encrypt(
      userCreateDto.password
    );
    const userDocumentToAdd = User.toDocument(userCreateDto);
    const userDocument = await this._userRepository.add(userDocumentToAdd);

    const payload = {
      id: userDocument._id,
      email: userDocument.email,
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
    };
    const token = this._tokenService.generateJwt(payload);

    authorizedResult.token = token;
    authorizedResult.expireIn = JwtConstants.JWT_EXPIRE_IN;
    authorizedResult.isAuthorized = true;
    return authorizedResult;
  }

  public async deleteUser(id: string): Promise<void> {
    await this._userRepository.removeById(id);
  }

  public async getAuthResult(
    payload: CustomJwtPayload
  ): Promise<AuthorizedResult> {
    const authorizedResult = this.returnInitialAuthorizedResult();
    const token = this._tokenService.generateJwt(payload);
    authorizedResult.token = token;
    authorizedResult.expireIn = JwtConstants.JWT_EXPIRE_IN;
    authorizedResult.isAuthorized = true;
    return authorizedResult;
  }

  private returnInitialAuthorizedResult(): AuthorizedResult {
    return {
      token: null,
      expireIn: null,
      isAuthorized: false,
    };
  }
}
