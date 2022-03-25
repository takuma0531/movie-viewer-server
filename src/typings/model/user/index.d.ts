import { Model, Document } from "mongoose";
import { IHasCustomMethod, IHasCustomStaticMethod } from "../base";
import { UserReadDto, UserCreateDto, UserUpdateDto } from "./dto";

export interface User {
  email: string;
  password: string;
  name: string;
  country: string;
  continent: string;
  role: number;
  age: string;
}

export interface UserDocument extends User, Document, IHasCustomUserMethod {}

export interface UserModel
  extends Model<UserDocument>,
    IHasCustomUserStaticMethod {}

export interface IHasCustomUserMethod extends IHasCustomMethod<UserReadDto> {}

export interface IHasCustomUserStaticMethod
  extends IHasCustomStaticMethod<UserDocument, UserCreateDto> {}
