import { RatingDocument } from "../../../typings/model/rating";
import { Repository } from "../base/Repository";
import { IRatingRepository } from "./IRatingRepository";

export class RatingRepository
  extends Repository<RatingDocument>
  implements IRatingRepository
{
  public async getSomeByUser(userId: string): Promise<RatingDocument[] | null> {
    try {
      const ratings = await this._model.find({ user: userId });
      return ratings;
    } catch (err: any) {
      throw err;
    }
  }

  public async getSomeByMovie(
    movieId: string
  ): Promise<RatingDocument[] | null> {
    try {
      let ratings = await this._model.find({ movie: movieId });
      for (let i = 0; i < ratings.length; i++) {
        ratings[i] = await ratings[i].populate({ path: "user", model: "User" });
      }
      return ratings;
    } catch (err: any) {
      throw err;
    }
  }

  public async getByUserAndMovie(
    userId: string,
    movieId: string
  ): Promise<RatingDocument | null> {
    try {
      const rating = await this._model.findOne({
        user: userId,
        movie: movieId,
      });
      return rating;
    } catch (err: any) {
      throw err;
    }
  }
}
