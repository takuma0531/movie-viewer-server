import { Schema } from "mongoose";
import { CommentDocument } from "../../../typings/model/comment";
import {
  CommentReadDto,
  CommentCreateDto,
} from "../../../typings/model/comment/dto";
import { Movie } from "../movie/movie.model";

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

  commentSchema.pre("save", async function (next) {
    try {
      console.log("document middleware invoked in comment plugin");
      const movieDocument = await Movie.findById(this.movie);
      if (!movieDocument) throw "Something went wrong";
      movieDocument.comments.push(this._id);
      await Movie.findByIdAndUpdate(movieDocument.id, movieDocument);
      next();
    } catch (err: any) {
      throw err;
    }
  });

  commentSchema.post("remove", async function (res, next) {
    try {
      console.log("query middleware invoked in comment plugin");
      const movieDocument = await Movie.findById(this.movie);
      if (!movieDocument) throw "Something went wrong";
      const index = movieDocument.comments.indexOf(this._id);
      movieDocument.comments.splice(index, 1);
      await Movie.findByIdAndUpdate(movieDocument.id, movieDocument);
      next();
    } catch (err: any) {
      throw err;
    }
  });
};
