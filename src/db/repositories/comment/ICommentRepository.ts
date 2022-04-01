import { CommentDocument } from "../../../typings/model/comment";
import { IRepository } from "../base/IRepository";

export interface ICommentRepository extends IRepository<CommentDocument> {
  getSomeByText(text: string): Promise<CommentDocument[] | null>;
  getSomeByMovie(movieId: string): Promise<CommentDocument[] | null>;
}
