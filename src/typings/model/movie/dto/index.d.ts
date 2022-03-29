import { BaseReadDto, BaseCreateDto, BaseUpdateDto } from "../../base/dto";
import { Movie } from "..";

export interface MovieReadDto extends BaseReadDto {
  title: Movie["title"];
  genre: Movie["genre"];
  description: Movie["description"];
  thumbnail?: Movie["thumbnail"];
  director: Movie["director"];
  artists: Movie["artists"];
  comments?: Movie["comments"];
  ratings?: Movie["ratings"];
}

export interface MovieCreateDto extends BaseCreateDto {
  title: Movie["title"];
  genre: Movie["genre"];
  description: Movie["description"];
  thumbnail?: Movie["thumbnail"];
  director: Movie["director"];
  artists: Movie["artists"];
  comments?: Movie["comments"];
  ratings?: Movie["ratings"];
}

export interface MovieUpdateDto extends BaseUpdateDto {
  title?: Movie["title"];
  genre?: Movie["genre"];
  description?: Movie["description"];
  thumbnail?: Movie["thumbnail"];
  director?: Movie["director"];
  artists?: Movie["artists"];
}
