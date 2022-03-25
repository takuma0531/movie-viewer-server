import { BaseReadDto, BaseCreateDto, BaseUpdateDto } from "../../base/dto";
import { User } from "../";

export interface UserReadDto extends BaseReadDto {
  email: User["email"];
  words: User["words"];
  name: User["name"];
  country: User["country"];
  continent: User["continent"];
  role: User["role"];
  age: User["age"];
  authResult?: AuthorizedResult;
}

export interface UserCreateDto extends BaseCreateDto {
  email: User["email"];
  password: User["password"];
  name: User["name"];
  country: User["country"];
  continent: User["continent"];
  role: User["role"];
  age: User["age"];
}

export interface UserUpdateDto extends BaseUpdateDto {
  email?: User["email"];
  password?: User["password"];
  name?: User["name"];
  country?: User["country"];
  continent?: User["continent"];
  role: User["role"];
  age?: User["age"];
}

export interface UserLoginRequestDto {
  email: User["email"];
  password: User["password"];
}

export interface AuthorizedResult {
  token?: string | null;
  expireIn?: any;
  isAuthorized: boolean;
}
