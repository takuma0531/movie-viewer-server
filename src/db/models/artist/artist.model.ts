import { Schema, model } from "mongoose";
import { ArtistDocument, ArtistModel } from "../../../typings/model/artist";
import { artistPlugin } from "./artist.plugin";

const artistSchema = new Schema<ArtistDocument>(
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

artistPlugin(artistSchema);

export const Artist = model<ArtistDocument, ArtistModel>("Model", artistSchema);
