import { BaseReadDto, BaseCreateDto, BaseUpdateDto } from "../../base/dto";
import { Rating } from "../";

export interface RatingReadDto extends BaseReadDto {
  point: Rating["point"];
  movie: Rating["movie"];
  user?: Rating["user"];
}

export interface RatingCreateDto extends BaseCreateDto {
  point: Rating["point"];
  movie: Rating["movie"];
  user: Rating["user"];
}

export interface RatingUpdateDto extends BaseUpdateDto {
  point?: Rating["point"];
  movie?: Rating["movie"];
  user?: Rating["user"];
}
