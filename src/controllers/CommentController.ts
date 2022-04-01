import { Request, Response } from "express";
import { ICommentService } from "../services/comment/ICommentService";
import { BaseController } from "./BaseController";

export class CommentController extends BaseController {
  constructor(private readonly _commentService: ICommentService) {
    super();
  }

  // @route     GET api/v1/comments
  // @desc      get all comments
  // @access    private & admin only
  public async getAllComments(req: Request, res: Response) {
    try {
      const commentReadDtos = await this._commentService.getAllComments();
      return super.ok(res, commentReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/comments/comment/:id
  // @desc      get comment by id
  // @access    public
  public async getCommentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const commentReadDto = await this._commentService.getCommentsById(id);
      return super.ok(res, commentReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/comments/search?text=
  // @desc      search comment by text
  // @access    private & admin only
  public async getCommentByText(req: Request, res: Response) {
    try {
      const { text } = req.query;
      const commentReadDtos = await this._commentService.getCommentsByText(
        text as string
      );
      return super.ok(res, commentReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/comments/movie?movieId=
  // @desc      get comments by movie
  // @access    public
  public async getCommentsByMovie(req: Request, res: Response) {
    try {
      const { movieId } = req.query;
      const commentReadDtos = await this._commentService.getCommentsByMovie(
        movieId as string
      );
      return super.ok(res, commentReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     POST api/v1/comments
  // @desc      create comment
  // @access    private
  public async createComment(req: Request, res: Response) {
    try {
      const commentCreateDto = req.body;
      const commentReadDto = await this._commentService.createComment(
        commentCreateDto
      );
      return super.ok(res, commentReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     PUT api/v1/comments
  // @desc      update a comment
  // @access    private
  public async updateComment(req: Request, res: Response) {
    try {
      const commentUpdateDto = req.body;
      const commentReadDto = await this._commentService.updateComment(
        commentUpdateDto
      );
      return super.ok(res, commentReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     DELETE api/v1/comments/comment/:id
  // @desc      remove comment
  // @access    private
  public async deleteComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this._commentService.deleteComment(id);
      return super.ok(res);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }
}
