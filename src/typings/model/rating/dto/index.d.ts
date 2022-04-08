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

export interface RatingReadDtosFilteredByUserAge {
  lte20: number;
  lte40: number;
  lte60: number;
  gte61: number;
}

export interface RatingReadDtosFilteredByUserLocation {
  asia: number;
  africa: number;
  europe: number;
  northAmerica: number;
  southAmerica: number;
  oceania: number;
  antarctica: number;
}

export interface RatingReadDtosSortedByUserGender {
  male: number;
  female: number;
  unknown: number;
}
