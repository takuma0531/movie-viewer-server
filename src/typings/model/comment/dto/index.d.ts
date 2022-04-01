import { BaseReadDto, BaseCreateDto, BaseUpdateDto } from "../../base/dto";
import { Comment } from "..";

export interface CommentReadDto extends BaseReadDto {
  text: Comment["text"];
  movie: Comment["movie"];
  user: Comment["user"];
  rating: Comment["rating"];
}

export interface CommentCreateDto extends BaseCreateDto {
  text: Comment["text"];
  movie: Comment["movie"];
  user: Comment["user"];
  rating?: Comment["rating"];
}

export interface CommentUpdateDto extends BaseUpdateDto {
  text?: Comment["text"];
  movie?: Comment["movie"];
  user?: Comment["user"];
  rating?: Comment["rating"];
}
