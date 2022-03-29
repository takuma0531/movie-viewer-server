import { MovieDocument } from "../../../typings/model/movie";
import { Repository } from "../base/Repository";
import { IMovieRepository } from "./IMovieRepository";

export class MovieRepository
  extends Repository<MovieDocument>
  implements IMovieRepository
{
  public async getSomeByTitle(title: string): Promise<MovieDocument[] | null> {
    try {
      const movies = await this._model.find({
        title: { $regex: "^" + title, $options: "i" },
      });
      return movies;
    } catch (err: any) {
      throw err;
    }
  }

  public async getByTitle(title: string): Promise<MovieDocument | null> {
    try {
      const movie = await this._model.findOne({ title });
      return movie;
    } catch (err: any) {
      throw err;
    }
  }

  public async getSomeLatest(limit: number): Promise<MovieDocument[] | null> {
    try {
      const movies = await this._model.find().sort({ _id: -1 }).limit(limit);
      return movies;
    } catch (err: any) {
      throw err;
    }
  }
}
