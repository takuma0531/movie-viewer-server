import { Schema } from "mongoose";
import { DirectorDocument } from "../../../typings/model/director";
import {
  DirectorReadDto,
  DirectorCreateDto,
} from "../../../typings/model/director/dto";
import { Movie } from "../movie/movie.model";

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
      description: this.description,
    };
    return directorReadDto;
  });

  directorSchema.post("remove", async function (res, next) {
    try {
      console.log("query middleware invoked in director plugin");
      this.movies.forEach(async (movie: any) => {
        const movieDocument = await Movie.findById(movie);
        if (!movieDocument) return next();
        movieDocument.director = "";
        await Movie.findByIdAndUpdate(movieDocument.id, movieDocument);
      });
      next();
    } catch (err: any) {
      throw err;
    }
  });
};
