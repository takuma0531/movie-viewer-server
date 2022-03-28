import { Schema, model } from "mongoose";
import { GenreDocument, GenreModel } from "../../../typings/model/genre";
import { genrePlugin } from "./genre.plugin";

const genreSchema = new Schema<GenreDocument>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);

genrePlugin(genreSchema);

export const Genre = model<GenreDocument, GenreModel>("Genre", genreSchema);
