import { Model, Document } from "mongoose";
import { IHasCustomMethod, IHasCustomStaticMethod } from "../base";
import { MovieDocument } from "../movie";
import { UserDocument } from "../user";
import { RatingCreateDto, RatingReadDto } from "./dto";

export interface Rating {
  point: number;
  movie: MovieDocument | string;
  user: UserDocument | string;
}

export interface RatingDocument
  extends Rating,
    Document,
    IHasCustomRatingMethod {}

export interface RatingModel
  extends Model<RatingDocument>,
    IHasCustomRatingStaticMethod {}

export interface IHasCustomRatingMethod
  extends IHasCustomMethod<RatingReadDto> {}

export interface IHasCustomRatingStaticMethod
  extends IHasCustomStaticMethod<RatingDocument, RatingCreateDto> {}
