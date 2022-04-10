import { BaseReadDto, BaseCreateDto, BaseUpdateDto } from "../../base/dto";
import { Artist } from "..";

export interface ArtistReadDto extends BaseReadDto {
  name: Artist["string"];
  description?: Artist["string"];
  movies?: Artist["movies"];
}

export interface ArtistCreateDto extends BaseCreateDto {
  name: Artist["string"];
  description?: Artist["string"];
  movies?: Artist["movies"];
}

export interface ArtistUpdateDto extends BaseUpdateDto {
  name?: Artist["string"];
  description?: Artist["string"];
  movies?: Artist["movies"];
}
