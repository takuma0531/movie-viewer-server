import { Model, Document } from "mongoose";
import { IHasCustomMethod, IHasCustomStaticMethod } from "../base";
import { GenreReadDto, GenreCreateDto, GenreUpdateDto } from "./dto";
import { MovieDocument } from "../movie";

export interface Genre {
  name: string;
  movies: string[] | MovieDocument[];
}

export interface GenreDocument extends Genre, Document, IHasCustomGenreMethod {}

export interface GenreModel
  extends Model<GenreDocument>,
    IHasCustomGenreStaticMethod {}

export interface IHasCustomGenreMethod extends IHasCustomMethod<GenreReadDto> {}

export interface IHasCustomGenreStaticMethod
  extends IHasCustomStaticMethod<GenreDocument, GenreCreateDto> {}
