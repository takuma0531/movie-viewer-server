import { GenreDocument } from "../../../typings/model/genre";
import { IRepository } from "../base/IRepository";

export interface IGenreRepository extends IRepository<GenreDocument> {
  getByName(name: string): Promise<GenreDocument | null>;
}
