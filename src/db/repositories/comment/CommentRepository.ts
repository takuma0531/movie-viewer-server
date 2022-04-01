import { CommentDocument } from "../../../typings/model/comment";
import { Repository } from "../base/Repository";
import { ICommentRepository } from "./ICommentRepository";

export class CommentRepository
  extends Repository<CommentDocument>
  implements ICommentRepository
{
  public async getSomeByText(text: string): Promise<CommentDocument[] | null> {
    try {
      const comments = await this._model.find({
        text: { $regex: "^" + name, $options: "i" },
      });
      return comments;
    } catch (err: any) {
      throw err;
    }
  }

  public async getSomeByMovie(
    movieId: string
  ): Promise<CommentDocument[] | null> {
    try {
      const comments = await this._model
        .find({ movie: movieId })
        .populate("user")
        .populate("rating");
      return comments;
    } catch (err: any) {
      throw err;
    }
  }
}
