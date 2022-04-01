import { Schema, model } from "mongoose";
import { CommentDocument, CommentModel } from "../../../typings/model/comment";
import { commentPlugin } from "./comment.plugin";

const commentSchema = new Schema<CommentDocument>(
  {
    text: {
      type: String,
      required: true,
    },
    movie: {
      type: Schema.Types.ObjectId,
    },
    user: {
      type: Schema.Types.ObjectId,
    },
    rating: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

commentPlugin(commentSchema);

export const Comment = model<CommentDocument, CommentModel>(
  "Comment",
  commentSchema
);
