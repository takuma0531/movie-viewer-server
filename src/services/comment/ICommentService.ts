import {
  CommentCreateDto,
  CommentReadDto,
  CommentUpdateDto,
} from "../../typings/model/comment/dto";

export interface ICommentService {
  getAllComments(): Promise<CommentReadDto[] | null>;
  getCommentsById(id: string): Promise<CommentReadDto | null>;
  getCommentsByText(text: string): Promise<CommentReadDto[] | null>;
  getCommentsByMovie(movieId: string): Promise<CommentReadDto[] | null>;
  createComment(commentCreateDto: CommentCreateDto): Promise<CommentReadDto>;
  updateComment(
    commentUpdateDto: CommentUpdateDto
  ): Promise<CommentReadDto | null>;
  deleteComment(id: string): Promise<void>;
}
