import { Schema, model } from "mongoose";
import { MovieDocument, MovieModel } from "../../../typings/model/movie";
import { moviePlugin } from "./model.plugin";

const movieSchema = new Schema<MovieDocument>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    director: {
      type: String,
    },
    artists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
  },
  { timestamps: true }
);

moviePlugin(movieSchema);

export const Movie = model<MovieDocument, MovieModel>("Movie", movieSchema);
