import { Director } from "..";
import { BaseCreateDto, BaseReadDto, BaseUpdateDto } from "../../base/dto";

export interface DirectorReadDto extends BaseReadDto {
  name: Director["name"];
  description?: Artist["string"];
  movies?: Director["movies"];
}

export interface DirectorCreateDto extends BaseCreateDto {
  name: Director["name"];
  description?: Artist["string"];
  movies?: Director["movies"];
}

export interface DirectorUpdateDto extends BaseUpdateDto {
  name?: Director["name"];
  description?: Artist["string"];
  movies?: Director["movies"];
}
