import { CommentController } from "../controllers/CommentController";
import { CommentService } from "../services/comment/CommentService";
import { CommentRepository } from "../db/repositories/comment/CommentRepository";
import { Comment } from "../db/models/comment/comment.model";

export const commentRepository = new CommentRepository(Comment);
export const commentService = new CommentService(commentRepository);
export const commentController = new CommentController(commentService);
