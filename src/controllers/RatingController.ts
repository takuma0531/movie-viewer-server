import { Request, Response } from "express";
import { IRatingService } from "../services/rating/IRatingService";
import { BaseController } from "./BaseController";

export class RatingController extends BaseController {
  constructor(private readonly _ratingService: IRatingService) {
    super();
  }

  // TODO:
  // @route     GET api/v1/ratings/movie/user-age?movieId=&minAge=&maxAge=
  // @desc      get ratings filtered by user at specific age and movie
  // @access    public
  public async getFilteredRatingByUserAtSpecificAgeAndMovie(
    req: Request,
    res: Response
  ) {
    try {
      const { movieId, minAge, maxAge } = req.query;
      return super.ok(res);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // TODO:
  // @route     GET api/v1/ratings/movie/user-continent?movieId=
  // @desc      get ratings filtered by user location and movie
  // @access    public
  public async getFilteredRatingsByUserInSpecificContinentAndMovie(
    req: Request,
    res: Response
  ) {
    try {
      const { movieId } = req.query;
      return super.ok(res);
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
      const sortedObject =
        await this._ratingService.sortRatingsByUserGenderAndMovie(
          movieId as string
        );
      return super.ok(res, sortedObject);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }
}
