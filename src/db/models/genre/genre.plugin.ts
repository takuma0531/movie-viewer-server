import { Schema } from "mongoose";
import { GenreDocument } from "../../../typings/model/genre";
import { GenreReadDto, GenreCreateDto } from "../../../typings/model/genre/dto";

export const genrePlugin = (genreSchema: Schema<GenreDocument>) => {
  genreSchema.static(
    "toDocument",
    function (genreCreateDto: GenreCreateDto): GenreDocument {
      return new this(genreCreateDto);
    }
  );

  genreSchema.method("toReadDto", function (): GenreReadDto {
    const genreReadDto: GenreReadDto = {
      id: this._id,
      name: this.name,
      movies: this.movies,
    };
    return genreReadDto;
  });
};
