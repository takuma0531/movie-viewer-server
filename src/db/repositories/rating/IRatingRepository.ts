import { RatingDocument } from "../../../typings/model/rating";
import { IRepository } from "../base/IRepository";

export interface IRatingRepository extends IRepository<RatingDocument> {
  getSomeByUser(userId: string): Promise<RatingDocument[] | null>;
  getSomeByMovie(movieId: string): Promise<RatingDocument[] | null>;
}
