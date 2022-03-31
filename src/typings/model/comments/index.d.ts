import { Model, Document } from "mongoose";
import { IHasCustomMethod, IHasCustomStaticMethod } from "../base";
import { MovieDocument } from "../movie";
import { RatingDocument } from "../rating";
import { UserDocument } from "../user";
import { CommentCreateDto, CommentReadDto, CommentUpdateDto } from "./dto";

export interface Comment {
  text: string;
  movie: MovieDocument | string;
  user: UserDocument | string;
  rating: RatingDocument | string;
}

export interface CommentDocument
  extends Comment,
    Document,
    IHasCustomCommentMethod {}

export interface CommentModel
  extends Model<CommentDocument>,
    IHasCustomCommentStaticMethod {}

export interface IHasCustomCommentMethod
  extends IHasCustomMethod<CommentReadDto> {}

export interface IHasCustomCommentStaticMethod
  extends IHasCustomStaticMethod<CommentDocument, CommentCreateDto> {}
