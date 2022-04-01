import { Schema, model } from "mongoose";
import { RatingDocument, RatingModel } from "../../../typings/model/rating";
import { ratingPlugin } from "./rating.plugin";

const ratingSchema = new Schema<RatingDocument>(
  {
    point: {
      type: Number,
      required: true,
    },
    movie: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

ratingPlugin(ratingSchema);

export const Rating = model<RatingDocument, RatingModel>(
  "Rating",
  ratingSchema
);
