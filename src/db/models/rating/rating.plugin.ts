import { Schema } from "mongoose";
import { RatingDocument } from "../../../typings/model/rating";
import {
  RatingReadDto,
  RatingCreateDto,
} from "../../../typings/model/rating/dto";
import { Movie } from "../movie/movie.model";
import { Rating } from "./rating.model";

export const ratingPlugin = (ratingSchema: Schema<RatingDocument>) => {
  ratingSchema.static(
    "toDocument",
    function (ratingCreateDto: RatingCreateDto): RatingDocument {
      return new this(ratingCreateDto);
    }
  );

  ratingSchema.method("toReadDto", function (): RatingReadDto {
    const ratingReadDto: RatingReadDto = {
      id: this._id,
      point: this.point,
      movie: this.movie,
      user: this.user,
    };
    return ratingReadDto;
  });

  ratingSchema.pre("save", async function (next) {
    try {
      console.log("document middleware invoked in rating plugin");
      // movie update
      const movieDocument = await Movie.findById(this.movie);
      movieDocument!.ratings.push(this._id);
      await Movie.findByIdAndUpdate(movieDocument!.id, movieDocument!);
      next();
    } catch (err: any) {
      throw err;
    }
  });

  ratingSchema.post("remove", async function (next) {
    try {
      console.log("query middleware invoked in rating plugin");
      const movieDocument = await Movie.findById(this.movie);
      const index = movieDocument!.ratings.indexOf(this._id);
      movieDocument!.ratings.splice(index, 1);
      await Rating.findByIdAndUpdate(movieDocument!.id, movieDocument!);
      next();
    } catch (err: any) {
      throw err;
    }
  });
};
