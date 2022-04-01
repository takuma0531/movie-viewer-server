import { Schema } from "mongoose";
import { CommentDocument } from "../../../typings/model/comment";
import {
  CommentReadDto,
  CommentCreateDto,
} from "../../../typings/model/comment/dto";

export const commentPlugin = (commentSchema: Schema<CommentDocument>) => {
  commentSchema.static(
    "toDocument",
    function (commentCreateDto: CommentCreateDto): CommentDocument {
      return new this(commentCreateDto);
    }
  );

  commentSchema.method("toReadDto", function (): CommentReadDto {
    const commentReadDto: CommentReadDto = {
      id: this._id,
      text: this.text,
      movie: this.movie,
      user: this.user,
      rating: this.rating,
    };
    return commentReadDto;
  });
};
