import { BaseReadDto, BaseCreateDto, BaseUpdateDto } from "../../base/dto";
import { User } from "../";

export interface UserReadDto extends BaseReadDto {
  email: User["email"];
  name: User["name"];
  country: User["country"];
  continent: User["continent"];
  role: User["role"];
  age: User["age"];
  gender: User["gender"];
  movies?: User["movies"];
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
  movies?: User["movies"];
}

export interface UserUpdateDto extends BaseUpdateDto {
  email?: User["email"];
  password?: User["password"];
  name?: User["name"];
  country?: User["country"];
  continent?: User["continent"];
  age?: User["age"];
  movies?: User["movies"];
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
