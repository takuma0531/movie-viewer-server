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
      const ratings = await this._model.find({ movie: movieId });
      return ratings;
    } catch (err: any) {
      throw err;
    }
  }
}
