import { Model, Document } from "mongoose";
import { IHasCustomMethod, IHasCustomStaticMethod } from "../base";
import { MovieCreateDto, MovieReadDto } from "./dto";
import { GenreDocument } from "../genre";
import { ArtistDocument } from "../artist";
import { DirectorDocument } from "../director";
import { CommentDocument } from "../comment";
import { RatingDocument } from "../rating";
import { UserDocument } from "../user";

export interface Movie {
  title: string;
  genre: string | GenreDocument;
  description: string;
  thumbnail: Buffer | string;
  director: string | DirectorDocument;
  artists: string[] | ArtistDocument[];
  comments: string[] | CommentDocument[];
  ratings: string[] | RatingDocument[];
  averageRating: number;
  user: string | UserDocument;
}

export interface MovieDocument extends Movie, Document, IHasCustomMovieMethod {}

export interface MovieModel
  extends Model<MovieDocument>,
    IHasCustomMovieStaticMethod {}

export interface IHasCustomMovieMethod extends IHasCustomMethod<MovieReadDto> {}

export interface IHasCustomMovieStaticMethod
  extends IHasCustomStaticMethod<MovieDocument, MovieCreateDto> {}
