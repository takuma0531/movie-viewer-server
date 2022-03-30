import { Schema, model } from "mongoose";
import {
  DirectorDocument,
  DirectorModel,
} from "../../../typings/model/director";
import { directorPlugin } from "./director.plugin";

const directorSchema = new Schema<DirectorDocument>(
  {
    name: {
      type: String,
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

directorPlugin(directorSchema);

export const Director = model<DirectorDocument, DirectorModel>(
  "Director",
  directorSchema
);
