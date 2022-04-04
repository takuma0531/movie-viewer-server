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
  lte20: RatingReadDto[];
  lte40: RatingReadDto[];
  lte60: RatingReadDto[];
  gte61: RatingReadDto[];
}

export interface RatingReadDtosFilteredByUserLocation {
  asia: RatingReadDto[];
  africa: RatingReadDto[];
  europe: RatingReadDto[];
  northAmerica: RatingReadDto[];
  southAmerica: RatingReadDto[];
  oceania: RatingReadDto[];
  antarctica: RatingReadDto[];
}

export interface RatingReadDtosSortedByUserGender {
  male: RatingReadDto[];
  female: RatingReadDto[];
  unknown: RatingReadDto[];
}
