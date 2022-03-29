import { Model, Document } from "mongoose";
import { IHasCustomMethod, IHasCustomStaticMethod } from "../base";
import { MovieCreateDto, MovieReadDto } from "./dto";
import { GenreDocument } from "../genre";
import { ArtistDocument } from "../artist";

export interface Movie {
  title: string;
  genre: string | GenreDocument;
  description: string;
  thumbnail: Buffer | string;
  director: string | any; // director doc TODO:
  artists: string[] | ArtistDocument[];
  comments: string[] | any[]; // comment doc TODO:
  ratings: string[] | any[];
}

export interface MovieDocument extends Movie, Document, IHasCustomMovieMethod {}

export interface MovieModel
  extends Model<MovieDocument>,
    IHasCustomMovieStaticMethod {}

export interface IHasCustomMovieMethod extends IHasCustomMethod<MovieReadDto> {}

export interface IHasCustomMovieStaticMethod
  extends IHasCustomStaticMethod<MovieDocument, MovieCreateDto> {}
