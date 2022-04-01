import { Schema } from "mongoose";
import { RatingDocument } from "../../../typings/model/rating";
import {
  RatingReadDto,
  RatingCreateDto,
} from "../../../typings/model/rating/dto";

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
};
