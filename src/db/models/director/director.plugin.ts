import { Schema } from "mongoose";
import { DirectorDocument } from "../../../typings/model/director";
import {
  DirectorReadDto,
  DirectorCreateDto,
} from "../../../typings/model/director/dto";

export const directorPlugin = (directorSchema: Schema<DirectorDocument>) => {
  directorSchema.static(
    "toDocument",
    function (directorCreateDto: DirectorCreateDto): DirectorDocument {
      return new this(directorCreateDto);
    }
  );

  directorSchema.method("toReadDto", function (): DirectorReadDto {
    const directorReadDto: DirectorReadDto = {
      id: this._id,
      name: this.name,
      movies: this.movies,
    };
    return directorReadDto;
  });
};
