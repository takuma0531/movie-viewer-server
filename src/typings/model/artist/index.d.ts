import { Model, Document } from "mongoose";
import { IHasCustomMethod, IHasCustomStaticMethod } from "../base";
import { ArtistReadDto, ArtistCreateDto, ArtistUpdateDto } from "./dto";
// movieDocument TODO:

export interface Artist {
  name: string;
  movies: any[];
}

export interface ArtistDocument
  extends Artist,
    Document,
    IHasCustomArtistMethod {}

export interface ArtistModel
  extends Model<ArtistDocument>,
    IHasCustomArtistStaticMethod {}

export interface IHasCustomArtistMethod
  extends IHasCustomMethod<ArtistReadDto> {}

export interface IHasCustomArtistStaticMethod
  extends IHasCustomStaticMethod<ArtistDocument, ArtistCreateDto> {}
