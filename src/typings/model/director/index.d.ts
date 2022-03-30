import { Model, Document } from "mongoose";
import { IHasCustomMethod, IHasCustomStaticMethod } from "../base";
import { MovieDocument } from "../movie";
import { DirectorCreateDto, DirectorReadDto, DirectorUpdateDto } from "./dto";

export interface Director {
  name: string;
  movies: string[] | MovieDocument[];
}

export interface DirectorDocument
  extends Director,
    Document,
    IHasCustomDirectorMethod {}

export interface DirectorModel
  extends Model<DirectorDocument>,
    IHasCustomDirectorStaticMethod {}

export interface IHasCustomDirectorMethod
  extends IHasCustomMethod<DirectorReadDto> {}

export interface IHasCustomDirectorStaticMethod
  extends IHasCustomStaticMethod<DirectorDocument, DirectorCreateDto> {}
