import { ICommentService } from "./ICommentService";
import {
  CommentCreateDto,
  CommentReadDto,
  CommentUpdateDto,
} from "../../typings/model/comment/dto";
import { Comment } from "../../db/models/comment/comment.model";
import { ICommentRepository } from "../../db/repositories/comment/ICommentRepository";
import { CommentDocument } from "../../typings/model/comment";
import { RatingDocument } from "../../typings/model/rating";
import { IRatingService } from "../rating/IRatingService";
import { RatingReadDto } from "../../typings/model/rating/dto";

export class CommentService implements ICommentService {
  constructor(
    private readonly _commentRepository: ICommentRepository,
    private readonly _ratingService: IRatingService
  ) {}

  public async getAllComments(): Promise<CommentReadDto[] | null> {
    try {
      const commentDocuments = await this._commentRepository.getAll();
      if (!commentDocuments) return commentDocuments;
      return this.convertDocumentsToReadDtos(commentDocuments);
    } catch (err: any) {
      throw err;
    }
  }

  public async getCommentsById(id: string): Promise<CommentReadDto | null> {
    try {
      const commentDocument = await this._commentRepository.getById(id);
      return commentDocument!.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async getCommentsByText(
    text: string
  ): Promise<CommentReadDto[] | null> {
    try {
      const commentDocuments = await this._commentRepository.getSomeByText(
        text
      );
      if (!commentDocuments) return commentDocuments;
      return this.convertDocumentsToReadDtos(commentDocuments);
    } catch (err: any) {
      throw err;
    }
  }

  public async getCommentsByMovie(
    movieId: string
  ): Promise<CommentReadDto[] | null> {
    try {
      const commentDocuments = await this._commentRepository.getSomeByMovie(
        movieId
      );
      if (!commentDocuments) return commentDocuments;
      return this.convertDocumentsToReadDtos(commentDocuments);
    } catch (err: any) {
      throw err;
    }
  }

  public async createComment(
    commentCreateDto: CommentCreateDto
  ): Promise<CommentReadDto> {
    try {
      const existingRatingReadDto =
        await this._ratingService.getRatingByUserIdAndMovieId(
          commentCreateDto.user as string,
          commentCreateDto.movie as string
        );
      let ratingReadDto: RatingReadDto | null;
      if (existingRatingReadDto) {
        const castedRating = commentCreateDto.rating as RatingDocument;
        ratingReadDto = await this._ratingService.updateRating({
          id: existingRatingReadDto.id,
          point: castedRating.point,
          user: commentCreateDto.user,
          movie: commentCreateDto.movie,
        });
      } else {
        const castedRatingCreateDto = commentCreateDto.rating as RatingDocument;
        castedRatingCreateDto.user = commentCreateDto.user;
        ratingReadDto = await this._ratingService.createRating(
          commentCreateDto.rating as RatingDocument
        );
      }
      if (!ratingReadDto) throw "Something went wrong";
      commentCreateDto.rating = ratingReadDto.id;
      const commentDocumentToAdd = Comment.toDocument(commentCreateDto);
      const commentDocument = await this._commentRepository.add(
        commentDocumentToAdd
      );
      return commentDocument.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async updateComment(
    commentUpdateDto: CommentUpdateDto
  ): Promise<CommentReadDto | null> {
    try {
      const commentDocument = await this._commentRepository.updateById(
        commentUpdateDto.id!,
        commentUpdateDto
      );
      return commentDocument!.toReadDto();
    } catch (err: any) {
      throw err;
    }
  }

  public async deleteComment(id: string): Promise<void> {
    try {
      await this._commentRepository.removeById(id);
    } catch (err: any) {
      throw err;
    }
  }

  private convertDocumentsToReadDtos(commentDocuments: CommentDocument[]) {
    const commentReadDtos = commentDocuments.map(
      (commentDocument: CommentDocument) => commentDocument.toReadDto()
    );
    return commentReadDtos;
  }
}
