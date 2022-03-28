import { Schema } from "mongoose";
import { ArtistDocument } from "../../../typings/model/artist";
import {
  ArtistReadDto,
  ArtistCreateDto,
} from "../../../typings/model/artist/dto";

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
    };
    return artistReadDto;
  });
};
