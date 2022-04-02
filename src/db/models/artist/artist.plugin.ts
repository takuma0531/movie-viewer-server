import { Schema } from "mongoose";
import { ArtistDocument } from "../../../typings/model/artist";
import {
  ArtistReadDto,
  ArtistCreateDto,
} from "../../../typings/model/artist/dto";
import { Movie } from "../movie/movie.model";

export const artistPlugin = (artistSchema: Schema<ArtistDocument>) => {
  artistSchema.static(
    "toDocument",
    function (artistCreateDto: ArtistCreateDto): ArtistDocument {
      return new this(artistCreateDto);
    }
  );

  artistSchema.method("toReadDto", function (): ArtistReadDto {
    const artistReadDto: ArtistReadDto = {
      id: this._id,
      name: this.name,
      movies: this.movies,
      description: this.description,
    };
    return artistReadDto;
  });

  artistSchema.post("remove", async function (res, next) {
    try {
      console.log("query middleware invoked in artist plugin");
      this.movies.forEach(async (movie: any) => {
        const movieDocument = await Movie.findById(movie);
        if (!movieDocument) return next();
        const index = movieDocument.artists.indexOf(this._id);
        movieDocument.artists.splice(index, 1);
        await Movie.findByIdAndUpdate(movieDocument.id, movieDocument);
      });
      next();
    } catch (err: any) {
      throw err;
    }
  });
};
