import { MovieDocument } from "../../../typings/model/movie";
import { Repository } from "../base/Repository";
import { IMovieRepository } from "./IMovieRepository";

export class MovieRepository
  extends Repository<MovieDocument>
  implements IMovieRepository
{
  public override async getById(id: string): Promise<MovieDocument> {
    try {
      const movie = (
        await (
          await (
            await (await super.getById(id))!.populate("user")
          ).populate("director")
        ).populate("artists")
      ).populate({
        path: "comments",
        populate: [
          { path: "user", model: "User" },
          { path: "rating", model: "Rating" },
        ],
      });
      return movie;
    } catch (err: any) {
      throw err;
    }
  }

  public async getSomeByTitle(title: string): Promise<MovieDocument[] | null> {
    try {
      const movies = await this._model
        .find({
          title: { $regex: "^" + title, $options: "i" },
        })
        .populate("user");
      return movies;
    } catch (err: any) {
      throw err;
    }
  }

  public async getByTitle(title: string): Promise<MovieDocument | null> {
    try {
      const movie = await this._model.findOne({ title }).populate("user");
      return movie;
    } catch (err: any) {
      throw err;
    }
  }

  public async getSomeLatest(limit: number): Promise<MovieDocument[] | null> {
    try {
      const movies = await this._model
        .find()
        .sort({ _id: -1 })
        .limit(limit)
        .populate("user");
      return movies;
    } catch (err: any) {
      throw err;
    }
  }
}
