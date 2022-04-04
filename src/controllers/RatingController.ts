import { Request, Response } from "express";
import { IRatingService } from "../services/rating/IRatingService";
import { BaseController } from "./BaseController";

export class RatingController extends BaseController {
  constructor(private readonly _ratingService: IRatingService) {
    super();
  }

  // @route     GET api/v1/ratings/movie/user-age?movieId=
  // @desc      get ratings filtered by user at specific age and movie
  // @access    public
  public async getFilteredRatingByUserAtSpecificAgeAndMovie(
    req: Request,
    res: Response
  ) {
    try {
      const { movieId } = req.query;
      const ratingReadDtosFilteredByUserAge =
        await this._ratingService.filterRatingsByUserAtSpecificAgeAndMovie(
          movieId as string
        );
      return super.ok(res, ratingReadDtosFilteredByUserAge);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/ratings/movie/user-continent?movieId=
  // @desc      get ratings filtered by user location and movie
  // @access    public
  public async getFilteredRatingsByUserInSpecificContinentAndMovie(
    req: Request,
    res: Response
  ) {
    try {
      const { movieId } = req.query;
      const ratingReadDtosFilteredByUserLocation =
        await this._ratingService.filterRatingsByUserInSpecificContinentAndMovie(
          movieId as string
        );
      return super.ok(res, ratingReadDtosFilteredByUserLocation);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/ratings/movie/user-gender?movieId=
  // @desc      get ratings sorted by user gender and movie
  // @access    public
  public async getSortedRatingsByUserGenderAndMovie(
    req: Request,
    res: Response
  ) {
    try {
      const { movieId } = req.query;
      const ratingReadDtosSortedByUserGender =
        await this._ratingService.sortRatingsByUserGenderAndMovie(
          movieId as string
        );
      return super.ok(res, ratingReadDtosSortedByUserGender);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }
}
