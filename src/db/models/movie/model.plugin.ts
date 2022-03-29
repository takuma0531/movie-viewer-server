import { Schema } from "mongoose";
import { MovieDocument } from "../../../typings/model/movie";
import { MovieReadDto, MovieCreateDto } from "../../../typings/model/movie/dto";

export const moviePlugin = (movieSchema: Schema<MovieDocument>) => {
  movieSchema.static(
    "toDocument",
    function (movieCreateDto: MovieCreateDto): MovieDocument {
      return new this(movieCreateDto);
    }
  );

  movieSchema.method("toReadDto", function (): MovieReadDto {
    const movieReadDto: MovieReadDto = {
      id: this._id,
      title: this.title,
      genre: this.genre,
      description: this.description,
      thumbnail: this.thumbnail,
      director: this.director,
      artists: this.artists,
      comments: this.comments,
      ratings: this.ratings,
    };
    return movieReadDto;
  });
};
