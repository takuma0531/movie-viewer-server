import { MovieDocument } from "../../../typings/model/movie";
import { IRepository } from "../base/IRepository";

export interface IMovieRepository extends IRepository<MovieDocument> {
  getSomeByTitle(title: string): Promise<MovieDocument[] | null>;
  getByTitle(title: string): Promise<MovieDocument | null>;
  getSomeLatest(limit: number): Promise<MovieDocument[] | null>;
}
