import { BaseReadDto, BaseCreateDto, BaseUpdateDto } from "../../base/dto";
import { Genre } from "..";

export interface GenreReadDto extends BaseReadDto {
  name: Genre["name"];
  movies: Genre["movies"];
}

export interface GenreCreateDto extends BaseCreateDto {
  name: Genre["name"];
  movies?: Genre["movies"];
}

export interface GenreUpdateDto extends BaseUpdateDto {
  name?: Genre["name"];
  movies?: Genre["movies"];
}